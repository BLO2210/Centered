import React, { useEffect, useState } from 'react';

function ExerciseTracker() {
  const [workoutDays, setWorkoutDays] = useState(0);
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    fetch(`http://localhost:8080/api/users/${userId}`)
      .then((response) => response.json())
      .then((user) => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

        let workoutDaysCount = 0;

        user.moodRatings.forEach((moodRating) => {
          const moodRatingDate = new Date(moodRating.timestamp);
          if (moodRatingDate >= startOfWeek && moodRatingDate <= endOfWeek && moodRating.exercise) {
            workoutDaysCount += 1;
          }
        });

        setWorkoutDays(workoutDaysCount);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  return (
    <div>
      You've worked out {workoutDays} days this week.
    </div>
  );
}

export default ExerciseTracker;
