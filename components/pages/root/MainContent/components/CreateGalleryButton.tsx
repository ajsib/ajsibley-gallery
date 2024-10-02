import { useState } from 'react';
import SecondaryButton from '@/components/UI/buttons/Secondary';
import Modal from '@/components/Shared/Modal';
import CreateNewGalleryModal from './CreateNewGalleryModal';

const CreateGalleryButton = () => {
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
        + Create New Gallery
      </SecondaryButton>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateNewGalleryModal onClose={closeModal}/>
      </Modal>
    </>
  );
};

export default CreateGalleryButton;
