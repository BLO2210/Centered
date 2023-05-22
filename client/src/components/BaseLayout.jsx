import React from 'react';
import Navbar from './Navbar.jsx';
import App from '../App.jsx';
import './BaseLayout.css';

function BaseLayout() {
  return (
    <div>
      <Navbar />
      <App />
    </div>
  );
}

export default BaseLayout;
