import './Main.css';
import React from 'react';
import { Fragment } from 'react';

import Header from './Header';
import Nav from './Nav';

function Main(props) {
  return (
    <Fragment>
      <Header {...props} />
      <Nav {...props} />
      <main className='main'>{props.children}</main>
    </Fragment>
  );
}

export default Main;
