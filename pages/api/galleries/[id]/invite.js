import { getSession } from 'next-auth/react';
import Gallery from '@/models/Gallery';
import User from '@/models/User';
import { connectToDatabase } from '@/utils/mongoose';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const { email } = req.body;  // The email of the user to invite

  await connectToDatabase();

  const gallery = await Gallery.findById(id);
  if (!gallery || gallery.owner.toString() !== session.user.id) {
    return res.status(403).json({ error: 'Only the gallery owner can invite users' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Add the user to the members list if not already a member
  if (!gallery.members.includes(user._id)) {
    gallery.members.push(user._id);
    await gallery.save();
  }

  return res.status(200).json({ message: 'User invited successfully' });
}
