import { validateToken } from '@/utils/authentication/tokenValidationMiddleware';
import Gallery from '@/models/Gallery';
import { connectToDatabase } from '@/utils/mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);

const handler = async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Gallery name is required' });
    }

    // Ensure unique access code by checking the database
    let accessCode;
    let isUnique = false;

    do {
      accessCode = nanoid(); // Generate a new code
      const existingGallery = await Gallery.findOne({ accessCode });
      if (!existingGallery) {
        isUnique = true;
      }
    } while (!isUnique);

    const gallery = new Gallery({
      name,
      description,
      owner: { userId: req.user.userId, username: req.user.username },  // Store both userId and username
      accessCode,
      members: [req.user.userId],
    });

    await gallery.save();
    return res.status(201).json({ gallery });
  }

  if (req.method === 'GET') {
    const galleries = await Gallery.find({
      $or: [
        { members: req.user.userId },
        { owner: { userId: req.user.userId } }
      ],
    })
      .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
      .populate('owner.userId', 'username email');  // Populate owner details

    return res.status(200).json({ galleries });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default validateToken(handler);
