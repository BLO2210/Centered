import React from 'react';
import Navbar from './Navbar.jsx';
import SleepGauge from './Sleepometer.jsx';
import Exercise from './Exercise.jsx';
import NutritionBar from './NutritionBar.jsx';
import TaskList from './TaskList.jsx';
import MoodBar from './MoodBar.jsx';

import './BaseLayout.css'; // Import the CSS file

function BaseLayout() {
  return (
    <div className = "bigContainer">
      <Navbar className='navbar' />
      <div className="container">
          <div className="left">
            <div className="sleep-gauge">
              <SleepGauge className = "sleepGauge"/>
            </div>
            <div className="nutrition-bar">
              <NutritionBar className = "nutritionBar"/>
            </div>
            <div className="mood-bar">
              <MoodBar className = "moodBar"/>
            </div>
            <div className="exercise-container">
              <Exercise className = "exercise"/>
            </div>
          </div>
          <div className="right">
            <div className="task-listB">
              <TaskList/>
            </div>
          </div>
        </div>
    </div>
  );
}

export default BaseLayout;
