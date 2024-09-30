/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;

  input, textarea {
    padding: 12px;
    font-size: 16px;
    border: 1px solid var(--color-border);
    border-radius: 2px; /* 2px border radius */
    width: 100%;
  }

  textarea {
    resize: none; /* Prevent resizing */
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

const charCountStyle = css`
  font-size: 12px;
  color: var(--color-muted);
  align-self: flex-end;
  margin-top: 0px; /* Adjust to bring closer to input/textarea */
`;

const maxTitleLength = 50; // Max character limit for title
const maxDescriptionLength = 250; // Max character limit for description

const CreateNewGalleryModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Handle title change with character limit enforcement
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxTitleLength) {
      setTitle(e.target.value);
    }
  };

  // Handle description change with character limit enforcement
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxDescriptionLength) {
      setDescription(e.target.value);
    }
  };

  // Placeholder for API call to create a new gallery
  const createNewGallery = async () => {
    console.log('Calling API to create a new gallery...');
    // Placeholder for actual API call:
    // Example: await axios.post('/api/gallery', { title, description });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewGallery(); // Call the API placeholder function
    console.log('New Gallery Created with title:', title, 'and description:', description);
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <h2>Create a New Gallery</h2>

      <label>
        <input 
          type="text" 
          placeholder="Gallery Name" 
          value={title} 
          onChange={handleTitleChange}
          required 
        />
        <div css={charCountStyle}>{title.length}/{maxTitleLength}</div>
      </label>

      <label>
        <textarea
          placeholder="Gallery Description"
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <div css={charCountStyle}>{description.length}/{maxDescriptionLength}</div>
      </label>
      
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateNewGalleryModal;
