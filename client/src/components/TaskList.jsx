// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (userId) {
//           const response = await axios.get(`http://localhost:8080/api/tasks/${userId}`, {
//             // Pass any necessary authentication headers or parameters
//           });
//           setTasks(response.data);
//         } else {
//           console.error('User ID not found in local storage.');
//         }
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);


//   return (
//     <div>
//       <h2>Tasks:</h2>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task._id}>
//             <input type="checkbox" checked={task.isComplete} />
//             {task.taskName}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            if (userId) {
              const response = await axios.get(`http://localhost:8080/api/tasks/${userId}`);
              setTasks(response.data.map(task => ({
                ...task,
                isComplete: task.isComplete || false, // Set isComplete to false if it is null or undefined
              })));
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
        <div>
            <h2>Tasks:</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <input
                            type="checkbox"
                            checked={task.isComplete}
                            onChange={(e) => handleCheckboxChange(task._id, e.target.checked)}
                        />
                        {task.taskName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
