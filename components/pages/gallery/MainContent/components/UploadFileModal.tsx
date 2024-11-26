/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { uploadFiles } from '@/components/pages/gallery/services';
import { useGalleryContext } from '@/components/pages/gallery/MainContent/GalleryContext';

interface UploadFileModalProps {
  galleryId: string;
  onClose: () => void;
}

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;

  input[type='file'] {
    padding: 12px;
    font-size: 16px;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    width: 100%;
  }

  button {
    align-self: flex-start;
    padding: 12px 24px;
    background-color: var(--color-primary);
    color: #ffffff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    font-family: inherit;
    border-radius: 2px;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #005a9e;
    }
  }
`;

const UploadFileModal = ({ galleryId, onClose }: UploadFileModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { appendMedia } = useGalleryContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files.length) return;

    try {
      const uploadedMedia = await uploadFiles(galleryId, files);
      uploadedMedia.forEach(media => appendMedia(media));
      onClose();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <h2>Upload Files</h2>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadFileModal;