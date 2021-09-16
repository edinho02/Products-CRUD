import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { Component } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';

import Footer from '../components/template/Footer';

import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className='app'>
          <Routes />
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
