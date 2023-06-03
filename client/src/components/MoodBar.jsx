import React, { useState, useEffect } from 'react';
import './MoodBar.css';

function MoodRatingBar() {
  const [averageMood, setAverageMood] = useState(0);

  const getWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0-6
    const numDay = now.getDate();

    const start = new Date(now); //copy
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now); //copy
    end.setDate(numDay + (6 - dayOfWeek));
    end.setHours(23, 59, 59, 999);

    return [start, end];
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    fetch(`http://localhost:8080/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const [weekStart, weekEnd] = getWeekDates();

        const thisWeeksRatings = data.moodRatings.filter((rating) => {
          let ratingDate = new Date(rating.timestamp);
          return ratingDate >= weekStart && ratingDate <= weekEnd;
        });

        const sum = thisWeeksRatings.reduce(
          (total, rating) => total + rating.rating,
          0
        );
        const average = sum / thisWeeksRatings.length || 0; // The || 0 handles case where thisWeeksRatings.length is 0 to avoid NaN
        setAverageMood(average);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="progress-card">
      <h1 className="title">Mood Rating</h1>
      <div className="progress-bar">
        <div
          className="mood-progress-bar-fill"
          style={{ width: `${averageMood * 10}%` }} // assuming mood rating is out of 10
        ></div>
      </div>
    </div>
  );
}

export default MoodRatingBar;