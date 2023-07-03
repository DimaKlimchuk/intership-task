import React from 'react';

const SearchBar = ({ handleSearchChange }) => {
  return (
    <div class="wrap">
      <div className="search">
        <input
          type="text"
          class="searchTerm"
          placeholder="Search model"
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
