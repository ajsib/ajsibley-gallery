/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { createNewGallery } from '@/components/pages/root/services';

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;

  input, textarea {
    padding: 12px;
    font-size: 16px;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    width: 100%;
  }

  textarea {
    resize: none;
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
  margin-top: 0;
`;

const maxTitleLength = 50;
const maxDescriptionLength = 250;

const CreateNewGalleryModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxTitleLength) {
      setTitle(e.target.value);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxDescriptionLength) {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newGallery = await createNewGallery(title, description);
      console.log('New Gallery Created:', newGallery);
      // Optionally reset the form after successful submission
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(`Failed to create the gallery. Please try again. : ${err}`);
    } finally {
      setLoading(false);
    }
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

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>

      {error && <p css={charCountStyle} style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default CreateNewGalleryModal;
