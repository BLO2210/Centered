import React, { useEffect, useState } from 'react';
import './Exercise.css'

function ExerciseTracker() {
  const [days, setDays] = useState(Array(7).fill(false));
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // an array to display the days of the week
  const userId = localStorage.getItem('userId');

  const fetchData = () => {
    fetch(`https://centered-server.onrender.com/api/users/${userId}`)
      .then((response) => response.json())
      .then((user) => {
        const today = new Date();
        const startOfWeek = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - today.getUTCDay());
        const endOfWeek = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - today.getUTCDay() + 6);

        const daysTemp = Array(7).fill(false); 

        user.moodRatings.forEach((moodRating) => {
          const moodRatingDate = new Date(moodRating.timestamp);
          const moodRatingDateUtc = new Date(moodRatingDate.getUTCFullYear(), moodRatingDate.getUTCMonth(), moodRatingDate.getUTCDate());
          if (moodRatingDateUtc >= startOfWeek && moodRatingDateUtc <= endOfWeek && moodRating.exercise) {
            const dayOfWeek = moodRatingDateUtc.getUTCDay();
            daysTemp[dayOfWeek] = true;
          }
        });

        setDays(daysTemp);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    console.log("useEffect is running..."); // log when useEffect is run
    fetchData();

    // Watch for changes in localStorage
    const handleStorageChange = () => {
      fetchData();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);  // Removed dependency array so useEffect runs every time the component is mounted

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
