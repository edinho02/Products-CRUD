import './Header.css';
import React from 'react';

function Header(props) {
  return (
    <header className='header d-none d-sm-flex flex-column'>
      <h1 className='lead'>{props.title}</h1>
    </header>
  );
}

export default Header;
