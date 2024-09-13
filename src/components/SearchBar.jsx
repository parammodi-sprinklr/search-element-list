// SearchBar.jsx
import React from 'react';

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  const handleChange = (e) => {
    onQueryChange(e.target.value);
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter Item!"
        className="w-3/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 outline-none"
      />
      <button
        onClick={onSearch}
        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        Scroll
      </button>
    </div>
  );
};

export default SearchBar;
