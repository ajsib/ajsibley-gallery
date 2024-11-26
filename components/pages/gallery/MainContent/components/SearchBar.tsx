/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchBarStyle = css`
    width: 100%;
  `;

  const inputStyle = css`
    width: 100%;
    font: inherit;
    padding: 12px;
    font-size: 16px;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    font-family: inherit;
  `;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', searchQuery);
    // Implement search logic here
  };

  return (
    <form css={searchBarStyle} onSubmit={handleSearch}>
      <input
        css={inputStyle}
        type="text"
        placeholder="Search media..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
