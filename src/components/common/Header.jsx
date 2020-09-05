import React, { useState } from 'react';

const Header = ({ onSubmit }) => {

  const [searchText, setSearchText] = useState('naruto');

  const handleChange = ev => {
    setSearchText(ev.target.value);
  };

  return (
    <header>
      <nav>
        <div className="search-bar">
          <form className="searchForm">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchText}
              onChange={handleChange}
            />
            <button type='submit' className="search-btn" onClick={(ev) => onSubmit(ev, searchText)}>Go</button>
          </form>
        </div>
      </nav>
    </header>
  )
};

export default Header;