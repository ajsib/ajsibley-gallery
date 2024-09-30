import { getSession } from 'next-auth/react';
import Gallery from '@/models/Gallery';
import Media from '@/models/Media';
import { connectToDatabase } from '@/utils/mongoose';

export default async function handler(req, res) {
  const { id } = req.query;
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectToDatabase();

  // Fetch details of a specific gallery including media
  if (req.method === 'GET') {
    const gallery = await Gallery.findById(id).populate('owner', 'username email').populate('members', 'username');
    
    if (!gallery || !gallery.members.includes(session.user.id)) {
      return res.status(403).json({ error: 'You do not have access to this gallery' });
    }

    const media = await Media.find({ gallery: id });

    return res.status(200).json({ gallery, media });
  }

  // Join a gallery using an access code
  if (req.method === 'POST') {
    const { accessCode } = req.body;

    const gallery = await Gallery.findOne({ _id: id, accessCode });

    if (!gallery) {
      return res.status(404).json({ error: 'Invalid access code or gallery not found' });
    }

    // Add the user to the members list if not already a member
    if (!gallery.members.includes(session.user.id)) {
      gallery.members.push(session.user.id);
      await gallery.save();
    }

    return res.status(200).json({ message: 'Joined the gallery successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
