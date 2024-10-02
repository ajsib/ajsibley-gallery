import { NextApiRequest, NextApiResponse } from 'next';
import { validateToken } from '@/utils/authentication/tokenValidationMiddleware';
import Gallery from '@/models/Gallery';
import { connectToDatabase } from '@/utils/mongoose';
import { customAlphabet } from 'nanoid';

// Define the alphabet for numbers and uppercase letters only
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);

// Define the handler with proper TypeScript types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Gallery name is required' });
    }

    // Ensure unique access code by checking the database
    let accessCode: string;
    let isUnique = false;

    // Loop to ensure the access code is unique
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
      owner: (req as any).user.userId,  // Using (req as any) to handle the custom property `user`
      accessCode,  // Unique access code
      members: [(req as any).user.userId], // Add the owner as the first member
    });

    await gallery.save();
    return res.status(201).json({ gallery });
  }

  if (req.method === 'GET') {
    const galleries = await Gallery.find({
      members: (req as any).user.userId,
    }).populate('owner', 'username email');

    return res.status(200).json({ galleries });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default validateToken(handler);
