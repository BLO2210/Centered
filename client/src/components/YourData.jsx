import React from 'react';
import Navbar from './Navbar.jsx';
import ParentComponent from './ParentComponent.jsx';
import './YourData.css';

function YourData() {
  return (
    <div className='container'>
      <Navbar/>
      <ParentComponent />
    </div>
  );
}

export default YourData;
