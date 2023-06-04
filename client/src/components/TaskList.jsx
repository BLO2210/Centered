import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/tasklist.css'

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            if (userId) {
              const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
              
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const tasksToday = [];

              response.data.moodRatings.forEach(moodRating => {
                const moodRatingDate = new Date(moodRating.timestamp);
                moodRatingDate.setHours(0, 0, 0, 0);
                
                if(moodRatingDate.getTime() === today.getTime()){
                  tasksToday.push(...moodRating.tasks.map(task => ({
                    ...task,
                    isComplete: task.isComplete || false, 
                  })));
                }
              });

              setTasks(tasksToday);

            } else {
              console.error('User ID not found in local storage.');
            }
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        };
      
        if (userId) {
          fetchTasks();
        }
      }, [userId]);
      

    const handleCheckboxChange = async (taskId, isChecked) => {
        try {
          const updatedTasks = tasks.map((task) => {
            if (task._id === taskId) {
              return { ...task, isComplete: isChecked };
            }
            return task;
          });
      
          setTasks(updatedTasks);
      
          await axios.put(`http://localhost:8080/api/tasks/${userId}/${taskId}`, {
            isComplete: isChecked,
          });
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };
      
      
    return (
        <div className = "task-list">
            <h2 className = "task-list-heading">Tasks:</h2>
            <ul className = "task-list-items">
                {tasks.map((task) => (
                    <li key={task._id} className = "task-list-item">
                        <input
                            className = "task-checkbox"
                            type="checkbox"
                            checked={task.isComplete}
                            onChange={(e) => handleCheckboxChange(task._id, e.target.checked)}
                        />
                        <p class = "task-name">{task.taskName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;









