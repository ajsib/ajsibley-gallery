// components/types.ts
import { Types } from 'mongoose';

// User Type
export interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password_hash: string;
  createdAt: Date;
  updatedAt: Date;
}

// Gallery Type
export interface Gallery {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    owner: {
      userId: User | Types.ObjectId; // References the user ID of the gallery owner
      username: string;  // Store the username of the gallery owner
    };
    accessCode: string;
    members: (User | Types.ObjectId)[]; // Users who have access to the gallery
    media: Types.ObjectId[]; // References to Media items
    thumbnail?: string; // Optional thumbnail URL
    shared: boolean;
    createdAt: Date;
    updatedAt: Date;
  }