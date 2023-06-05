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
import './DataGraph.css'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const colors = {
  rating: 'rgba(75, 192, 192, 0.2)',
  sleepQuality: 'rgba(255, 206, 86, 0.2)',
  nutritionRating: 'rgba(255, 99, 132, 0.2)',
  exercise: 'rgba(153, 102, 255, 0.2)'
};

const MoodGraph = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [moodData, setMoodData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterVariables, setFilterVariables] = useState([]);

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

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setFilterVariables([...filterVariables, value]);
    } else {
      setFilterVariables(filterVariables.filter(variable => variable !== value));
    }
  };

  const chartLabels = filteredData.map((item) => new Date(item.timestamp).toLocaleDateString());
  const chartDatasets = filterVariables.map((variable) => ({
    label: variable,
    data: filteredData.map((item) => item[variable]),
    fill: false,
    backgroundColor: colors[variable],
    borderColor: colors[variable],
  }));

  return (
    <div className='mood-graph-container'>
      <div>
        <label>
          <input
            type="checkbox"
            value="rating"
            onChange={handleCheckboxChange}
          />
          Mood Rating
        </label>
        <label>
          <input
            type="checkbox"
            value="sleepQuality"
            onChange={handleCheckboxChange}
          />
          Sleep Quality
        </label>
        <label>
          <input
            type="checkbox"
            value="nutritionRating"
            onChange={handleCheckboxChange}
          />
          Nutrition Rating
        </label>
        <label>
          <input
            type="checkbox"
            value="exercise"
            onChange={handleCheckboxChange}
          />
          Exercise
        </label>
      </div>

      <Line 
        data={{
          labels: chartLabels,
          datasets: chartDatasets,
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
