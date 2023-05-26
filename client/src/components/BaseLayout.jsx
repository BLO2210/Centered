import React from 'react';
import Navbar from './Navbar.jsx';
import App from '../App.jsx';
import Form from './Form.jsx';
import SleepGauge from './Sleepometer.jsx';
import ProductivityBar from './ProductivityBar.jsx';
import NutritionBar from './NutritionBar.jsx';

import './BaseLayout.css';

function BaseLayout() {
  return (
    <div>
      <Navbar />
      <SleepGauge/>
      <ProductivityBar />
      <NutritionBar />
    </div>
  );
}

export default BaseLayout;
