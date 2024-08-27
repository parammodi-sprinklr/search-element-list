// SearchBar.jsx
import React from 'react';

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  const handleChange = (e) => {
    onQueryChange(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
