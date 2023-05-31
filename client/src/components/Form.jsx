import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css'

function Form() {
    const navigate = useNavigate();
    const [rating, setRating] = useState(5);
    const [sleepQuality, setSleepQuality] = useState(5);
    const [productivityRating, setProductivityRating] = useState(5);
    const [nutritionRating, setNutritionRating] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [exercise, setExercise] = useState(false);
    const [formId, setFormId] = useState(null);

    const handleRatingChange = (e) => {
        setRating(Number(e.target.value));
    };    

    const handleSleepQualityChange = (e) => {
        setSleepQuality(e.target.value);
    }

    const handleProductivityRatingChange = (e) => {
        setProductivityRating(e.target.value);
    }

    const handleNutritionRatingChange = (e) => {
        const nutritionMapping = {
            "satisfied-nutritious": 1,
            "satisfied-not-nutritious": 2,
            "not-satisfied-somewhat-nutritious": 3,
            "not-satisfied-not-nutritious": 4
        };
        setNutritionRating(nutritionMapping[e.target.value]);
    }

    const handleExerciseChange = (e) => {
        setExercise(e.target.checked);
    }

    const handleTaskChange = (index, e) => {
        const newTasks = [...tasks];
        newTasks[index].taskName = e.target.value;
        setTasks(newTasks);
    }

    const handleTaskCompletionChange = (index, e) => {
        const newTasks = [...tasks];
        newTasks[index].isComplete = e.target.checked;
        setTasks(newTasks);
    }

    const handleNewTaskChange = (e) => {
        setNewTask(e.target.value);
    }

    const handleAddTask = () => {
        const newTasks = [...tasks, { taskName: newTask, isComplete: false }];
        setTasks(newTasks);
        setNewTask("");
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const date = new Date().toISOString().split('T')[0];

        fetch(`http://localhost:8080/api/mood-rating/${userId}/${date}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setFormId(data.id);
                    setRating(data.rating);
                    setSleepQuality(data.sleepQuality);
                    setProductivityRating(data.productivityRating);
                    setNutritionRating(data.nutritionRating);
                    setExercise(data.exercise);
                    setTasks(data.tasks || []);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('userId');

        const ratingData = {
            userId: userId,
            rating: rating,
            sleepQuality: sleepQuality,
            productivityRating: productivityRating,
            nutritionRating: nutritionRating,
            exercise: exercise,
            tasks: tasks,
        };

        const url = formId ? `http://localhost:8080/api/mood-rating/${formId}` : 'http://localhost:8080/api/mood-rating';
        const method = formId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ratingData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem('updated', Date.now());
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="form-container">
            <h1>Log your day</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>How would you rate your mood today?</label>
                    <input
                        type="range"
                        name="rating"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={handleRatingChange}
                    />
                    <span>{rating}</span>
                </div>
                <div className="form-control">
                    <label>How well did you sleep last night?</label>
                    <input
                        type="range"
                        name="sleepQuality"
                        min="1"
                        max="10"
                        value={sleepQuality}
                        onChange={handleSleepQualityChange}
                    />
                    <span>{sleepQuality}</span>
                </div>
                <div className="form-control">
                    <label>Rate your productivity today:</label>
                    <input
                        type="range"
                        name="productivityRating"
                        min="1"
                        max="10"
                        value={productivityRating}
                        onChange={handleProductivityRatingChange}
                    />
                    <span>{productivityRating}</span>
                </div>
                <div className="form-control">
                    <label>How satisfied were you with your nutrition today?</label>
                    <select
                        name="nutritionRating"
                        value={nutritionRating}
                        onChange={handleNutritionRatingChange}
                    >
                        <option value="satisfied-nutritious">
                            I feel satisfied, and I ate nutritiously.
                        </option>
                        <option value="satisfied-not-nutritious">
                            I feel satisfied, but I did not eat nutritiously.
                        </option>
                        <option value="not-satisfied-somewhat-nutritious">
                            Not satisfied, but somewhat nutritious.
                        </option>
                        <option value="not-satisfied-not-nutritious">
                            Not satisfied, and not nutritious.
                        </option>
                    </select>
                </div>
                <div className="form-control">
                    <label>Did you exercise today?</label>
                    <input
                        type="checkbox"
                        name="exercise"
                        checked={exercise}
                        onChange={handleExerciseChange}
                    />
                </div>
                {tasks.map((task, index) => (
                    <div key={index} className="form-control">
                        <label>
                            <input
                                type="checkbox"
                                checked={task.isComplete}
                                onChange={(e) => handleTaskCompletionChange(index, e)}
                            />
                            <input
                                type="text"
                                value={task.taskName}
                                onChange={(e) => handleTaskChange(index, e)}
                            />
                        </label>
                    </div>
                ))}
                <div className="form-control">
                    <label>New Task:</label>
                    <input
                        type="text"
                        value={newTask}
                        onChange={handleNewTaskChange}
                    />
                    <button type="button" onClick={handleAddTask}>
                        Add Task
                    </button>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Form;
