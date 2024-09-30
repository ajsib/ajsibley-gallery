# Project Overview: AJSibley Domain Ecosystem - Gallery Application

## Executive Summary

The **AJSibley Gallery Application** is part of the AJSibley domain ecosystem, designed to offer users a platform for storing, organizing, and sharing their personal photos. The application integrates MongoDB as the database for managing user and photo metadata and utilizes Microsoft Azure Storage for securely storing the actual image files. Built using **Next.js**, the application focuses on simplicity and efficiency, making it easy for users to upload, manage, and share their photo collections.

The architecture of the Gallery Application is a simple, scalable system built with modern web technologies:
- **Next.js** for the frontend and backend.
- **MongoDB** for database operations.
- **Microsoft Azure Storage** for storing photos.
- **pnpm** for package management and efficient dependency handling.

### Features:
1. **User-friendly photo storage**: Easily upload, manage, and view photos.
2. **Photo sharing**: Share your photo albums with other users.
3. **Secure storage**: Images are stored securely on Microsoft Azure's cloud storage.

The inspiration behind this project is to create a robust, private photo-sharing platform that can scale as your gallery grows, offering cloud storage and secure image sharing with minimal effort.

## Application Architecture

### 1. **Frontend**
- Built using **Next.js**, the frontend provides a responsive, modern interface for users to upload, manage, and view their images.
  
### 2. **Backend**
- The Next.js backend handles authentication, data flow, and communication between the frontend, MongoDB, and Microsoft Azure Storage.
  
### 3. **Database** (MongoDB)
- MongoDB is used to store user data, metadata related to each photo (such as upload date, title, etc.), and permissions related to photo sharing.

### 4. **Storage** (Microsoft Azure Storage)
- Microsoft Azure Storage is responsible for securely storing and retrieving the actual image files uploaded by users.

### 5. **Package Management** (pnpm)
- We use `pnpm` for efficient package management. It speeds up the installation process and optimizes disk space usage compared to traditional package managers like npm or yarn.

---

## Steps to Get the Gallery Application Running

### Prerequisites
Make sure you have the following installed on your machine before starting:
- **Node.js** (v14 or above)
- **pnpm** package manager
- **MongoDB** (locally or cloud instance)
- **Microsoft Azure Storage Account**

### Installation Instructions

#### Windows and Linux

1. **Clone the Repository**
   First, clone the project repository from the version control system (GitHub, Bitbucket, etc.).

   ```bash
   git clone https://github.com/ajsib/ajsibley-gallery.git
   cd ajsibley-gallery
   ```

2. **Install Dependencies**
   We are using `pnpm` to handle dependencies. To install all necessary packages, run:

   ```bash
   pnpm install
   ```

3. **Setup Environment Variables**
   Create an `.env.local` file at the root of the project directory and add the following environment variables. This configuration ensures the app can connect to MongoDB and Microsoft Azure Storage.

   ```bash
   MONGODB_URI=themongourikeyused
   AZURE_STORAGE_ACCOUNT_NAME=your_storage_account_name
   AZURE_STORAGE_ACCOUNT_KEY=your_storage_account_key
   AZURE_CONTAINER_NAME=your_container_name
   ```

   Adjust these values based on your local or cloud configuration.

4. **Database Setup (MongoDB)**
   Ensure MongoDB is running either locally or in the cloud (e.g., MongoDB Atlas). If running locally, you can start MongoDB with:

   ```bash
   mongod
   ```

   The application will connect to the database specified by the `MONGODB_URI` in the environment variables.

5. **Run Development Server**
   To start the Next.js development server, use the following command:

   ```bash
   pnpm run dev
   ```

   The application will now be accessible at `http://localhost:3000`.

6. **Access and Use the Application**
   Open your browser and visit `http://localhost:3000`. You can now interact with the gallery, upload photos, and share them with others.

---

## Conclusion

The AJSible Gallery Application provides an easy-to-use platform for managing and sharing personal photos. With a solid architecture backed by Next.js, MongoDB, and Microsoft Azure Storage, the application ensures data security and scalability. The combination of a user-friendly interface and a robust backend allows users to effortlessly store, organize, and share their photo collections.