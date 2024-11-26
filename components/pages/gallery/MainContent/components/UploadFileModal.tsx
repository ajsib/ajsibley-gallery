/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { getUploadUrl, uploadFileDirectly } from '@/components/pages/gallery/services';
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
  const [file, setFile] = useState<File | null>(null);
  const { appendMedia } = useGalleryContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    try {
      // Step 1: Get signed upload URL and media reference
      const { uploadUrl, media } = await getUploadUrl(
        galleryId,
        file.name,
        file.type,
        file.size
      );

      // Step 2: Upload file directly to Azure Blob Storage
      await uploadFileDirectly(uploadUrl, file);

      // Step 3: Append the new media to context
      appendMedia(media);

      onClose();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <h2>Upload a File</h2>
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadFileModal;
