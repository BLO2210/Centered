import React from 'react';
import Navbar from './Navbar.jsx';
import DataGraph from './DataGraph.jsx';
import ParentComponent from './ParentComponent.jsx';

function YourData() {
    return (
      <div>
        <Navbar />
        <ParentComponent />
      </div>
    );
  }
  
  export default YourData;