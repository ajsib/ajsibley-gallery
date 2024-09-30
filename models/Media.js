import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,  // URL to the Azure Blob Storage
  },
  mimeType: {
    type: String,
    required: true,  // e.g., image/jpeg, video/mp4
  },
  size: {
    type: Number,  // File size in bytes
    required: true,
  },
  gallery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery',  // References the gallery this media belongs to
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // The user who uploaded this media
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);
