import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale } from 'chart.js';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Chart.register(CategoryScale);

function DataGraph() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [dataOptions, setDataOptions] = useState({
    sleep: false,
    nutrition: false,
    rating: false,
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${userId}`)
      .then((response) => setUser(response.data))
      .catch((err) => console.error(err));
  }, [userId]);

  const chartData = {
    labels: user?.moodRatings?.map((rating) => new Date(rating.timestamp).getDay()) || [],
    datasets: [
      {
        label: 'Sleep Quality',
        data: user?.moodRatings?.map((rating) => rating.sleepQuality) || [],
        borderColor: dataOptions.sleep ? ['rgba(75,192,192,1)'] : ['transparent'],
        borderWidth: 2,
      },
      {
        label: 'Nutrition Rating',
        data: user?.moodRatings?.map((rating) => rating.nutritionRating) || [],
        borderColor: dataOptions.nutrition ? ['rgba(255,206,86,1)'] : ['transparent'],
        borderWidth: 2,
      },
      {
        label: 'Mood Rating',
        data: user?.moodRatings?.map((rating) => rating.rating) || [],
        borderColor: dataOptions.rating ? ['rgba(255,99,132,1)'] : ['transparent'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h1>Data Graph</h1>
      <div>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <label>
          <input
            type="checkbox"
            name="sleep"
            checked={dataOptions.sleep}
            onChange={(e) =>
              setDataOptions({ ...dataOptions, sleep: e.target.checked })
            }
          />
          Sleep Quality
        </label>
        <label>
          <input
            type="checkbox"
            name="nutrition"
            checked={dataOptions.nutrition}
            onChange={(e) =>
              setDataOptions({ ...dataOptions, nutrition: e.target.checked })
            }
          />
          Nutrition Rating
        </label>
        <label>
          <input
            type="checkbox"
            name="rating"
            checked={dataOptions.rating}
            onChange={(e) =>
              setDataOptions({ ...dataOptions, rating: e.target.checked })
            }
          />
          Mood Rating
        </label>
      </div>
      {user && (
        <Line
          data={chartData}
          key={Math.random()}
        />
      )}
    </div>
  );
}

export default DataGraph;
