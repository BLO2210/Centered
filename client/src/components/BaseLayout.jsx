import React from 'react';
import Navbar from './Navbar.jsx';
import App from '../App.jsx';
import Form from './Form.jsx';
import SleepGauge from './Sleepometer.jsx';

import './BaseLayout.css';

function BaseLayout() {
  return (
    <div>
      <Navbar />
      <Form/>
      <SleepGauge/>
    </div>
  );
}

export default BaseLayout;
