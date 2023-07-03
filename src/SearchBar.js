import React from 'react';

const SearchBar = ({ handleSearchChange }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search model"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
