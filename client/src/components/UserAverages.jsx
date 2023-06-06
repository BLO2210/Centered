import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserAverages.css'

const UserAverages = ({ startDate, endDate }) => {
  const [moodData, setMoodData] = useState([]);
  const [averages, setAverages] = useState({ rating: 0, sleepQuality: 0, nutritionRating: 0, exercise: 0, totalDays: 0 });

  const userId = localStorage.getItem('userId');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
      if (response.status !== 200) {
        console.error(`Error: Received status code ${response.status}`);
      } else if (!response.data.moodRatings) {
        console.error('Error: No mood ratings in response data');
      } else {
        setMoodData(response.data.moodRatings);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (startDate && endDate && moodData.length > 0) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const totalDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;  // Calculate total days
      const filtered = moodData.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= start && itemDate <= end;
      });

      if (filtered.length > 0) {
        const sums = filtered.reduce((sums, item) => {
          sums.rating += item.rating;
          sums.sleepQuality += item.sleepQuality;
          sums.nutritionRating += item.nutritionRating;
          sums.exercise += item.exercise ? 1 : 0;  // Counts the true values
          return sums;
        }, { rating: 0, sleepQuality: 0, nutritionRating: 0, exercise: 0 });

        setAverages({
          rating: (sums.rating / filtered.length).toFixed(2),
          sleepQuality: (sums.sleepQuality / filtered.length).toFixed(2),
          nutritionRating: (sums.nutritionRating / filtered.length).toFixed(2),
          exercise: sums.exercise,  // Now represents total days of exercise
          totalDays: totalDays
        });
      }
    }
  }, [startDate, endDate, moodData]);

  return (
    <div className='averages-card'>
      <h2>Averages from {startDate} to {endDate}</h2>
      <div className='averages-container'>
        <div className='average-item'>
          <span className='average-label'>Mood Rating:</span> 
          <span className='average-value mood-rating'>{averages.rating}</span> 
          <span>out of 10</span>
        </div>
        <div className='average-item'>
          <span className='average-label'>Sleep Quality:</span> 
          <span className='average-value sleep-quality'>{averages.sleepQuality}</span>
          <span>out of 10</span>
        </div>
        <div className='average-item'>
          <span className='average-label'>Nutrition Rating:</span> 
          <span className='average-value nutrition-rating'>{averages.nutritionRating}</span>
          <span>out of 4</span>
        </div>
        <div className='average-item'>
          <span className='average-label'>Days Exercised:</span> 
          <span className='average-value exercise-days'>{averages.exercise}</span> 
          <span>out of {averages.totalDays}</span>
        </div>
      </div>
    </div>
  );
};

export default UserAverages;