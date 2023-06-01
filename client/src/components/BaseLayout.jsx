import React from 'react';
import Navbar from './Navbar.jsx';
import SleepGauge from './Sleepometer.jsx';
import Exercise from './Exercise.jsx';
import NutritionBar from './NutritionBar.jsx';
import TaskList from './TaskList.jsx';

import './BaseLayout.css';

function BaseLayout() {
  return (
    <div>
      <Navbar />
      <SleepGauge/>
      <TaskList/>
      <NutritionBar />
      <Exercise />
    </div>
  );
}

export default BaseLayout;
