import { useState } from 'react';
import SecondaryButton from '@/components/UI/buttons/Secondary';
import Modal from '@/components/Shared/Modal';
import UploadFileModal from './UploadFileModal';

interface UploadFileButtonProps {
  galleryId: string;
}

const UploadFileButton = ({ galleryId }: UploadFileButtonProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SecondaryButton onClick={openModal}>
        + Upload File
      </SecondaryButton>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UploadFileModal galleryId={galleryId} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default UploadFileButton;
