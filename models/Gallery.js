import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // References the user who owns the gallery
    required: true,
  },
  accessCode: {
    type: String,
    required: true,  // The unique code for access to the gallery
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Users who have access to the gallery
  }],
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',  // List of media items associated with the gallery
  }],
  thumbnail: {
    type: String, // URL or reference to the thumbnail image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
