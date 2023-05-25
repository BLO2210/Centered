import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
    const navigate = useNavigate();
    const [rating, setRating] = useState(5)
    const [sleepQuality, setSleepQuality] = useState(5)

    const handleRatingChange = (e) => {
        setRating(e.target.value)
    };

    const handleSleepQualityChange = (e) => {
        setSleepQuality(e.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('userId');

        const ratingData = {
            userId: userId,
            rating: rating,
            sleepQuality: sleepQuality
        };

        fetch('http://localhost:8080/api/mood-rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ratingData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // after successful submission
                localStorage.setItem('updated', Date.now());
                navigate('/');

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <>
            <h1>Please rate your mood today</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="range"
                    name="rating"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={handleRatingChange}
                />
                <br />
                <h1>How would you rate the quality of your sleep last night?</h1>
                <input
                    type="range"
                    name="sleepQuality"
                    min="1"
                    max="10"
                    value={sleepQuality}
                    onChange={handleSleepQualityChange}
                />
                <h1>How would you rate your nutrition today? Choose one of the following</h1>
                <h2></h2>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}


export default Form