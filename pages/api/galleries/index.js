import { getSession } from 'next-auth/react';
import Gallery from '@/models/Gallery';
import { connectToDatabase } from '@/utils/mongoose';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectToDatabase();

  // Create a new gallery
  if (req.method === 'POST') {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Gallery name is required' });
    }

    const accessCode = nanoid(5);  // Generate access code for sharing

    const gallery = new Gallery({
      name,
      description,
      owner: session.user.id,
      accessCode,
      members: [session.user.id],  // Add the owner as the first member
    });

    await gallery.save();
    return res.status(201).json({ gallery });
  }

  // Fetch galleries where the user is a member or owner
  if (req.method === 'GET') {
    const galleries = await Gallery.find({
      members: session.user.id,
    }).populate('owner', 'username email');

    return res.status(200).json({ galleries });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
