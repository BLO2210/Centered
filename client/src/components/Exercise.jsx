import React, { useEffect, useState } from 'react';
import './Exercise.css'

function ExerciseTracker() {
  const [days, setDays] = useState(Array(7).fill(false));
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // an array to display the days of the week

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    fetch(`http://localhost:8080/api/users/${userId}`)
      .then((response) => response.json())
      .then((user) => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

        const daysTemp = [...days];

        user.moodRatings.forEach((moodRating) => {
          const moodRatingDate = new Date(moodRating.timestamp);
          if (moodRatingDate >= startOfWeek && moodRatingDate <= endOfWeek && moodRating.exercise) {
            const dayOfWeek = moodRatingDate.getDay();
            daysTemp[dayOfWeek] = true;
          }
        });

        setDays(daysTemp);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="exercise-tracker-card">
      <h2>Exercise</h2>
      <div className="week-container">
        {days.map((day, index) => (
          <div className="day-container" key={index}>
            <div className={`circle ${day ? 'filled' : ''}`}></div>
            <p>{daysOfWeek[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseTracker;
