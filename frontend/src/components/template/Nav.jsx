import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
  return (
    <div className='nav'>
      <Link to='/' className='page return'>
        <i className={'fa fa-home'}></i> Home
      </Link>
      <Link to='/product' className='page create'>
        <i className={'fa fa-plus'}></i> Produto
      </Link>
    </div>
  );
}

export default Nav;
