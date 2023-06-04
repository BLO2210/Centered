import React from 'react';
import Navbar from './Navbar.jsx';
import SleepGauge from './Sleepometer.jsx';
import Exercise from './Exercise.jsx';
import NutritionBar from './NutritionBar.jsx';
import TaskList from './TaskList.jsx';
import MoodBar from './MoodBar.jsx';

import './BaseLayout.css';

function BaseLayout() {
  return (
    <div className="container">
      <Navbar />
      <div className="top-left">
        <SleepGauge/>
      </div>
      <div className="bottom-right">
        <TaskList/>
      </div>
      <div className="bottom-left">
        <div className="nutrition-bar">
          <NutritionBar />
        </div>
      </div>
      <div class = "mood">
      <MoodBar />
      </div>
      <Exercise />
    </div>
  );
}


export default BaseLayout;
