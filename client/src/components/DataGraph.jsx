import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const MoodGraph = () => {
  const [moodData, setMoodData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterVariable, setFilterVariable] = useState('rating');

  const userId = localStorage.getItem('userId');

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
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
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const filtered = moodData.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= start && itemDate <= end;
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, moodData]);

  const chartLabels = filteredData.map((item) => new Date(item.timestamp).toLocaleDateString());
  const chartData = filteredData.map((item) => item[filterVariable]);

  return (
    <div>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <select value={filterVariable} onChange={(e) => setFilterVariable(e.target.value)}>
        <option value="rating">Mood Rating</option>
        <option value="sleepQuality">Sleep Quality</option>
        <option value="nutritionRating">Nutrition Rating</option>
        <option value="exercise">Exercise</option>
      </select>

      <Line 
        data={{
          labels: chartLabels,
          datasets: [{
            label: filterVariable,
            data: chartData,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          }]
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default MoodGraph;
