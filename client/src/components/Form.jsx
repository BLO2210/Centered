


import React, { useState } from 'react';

function Form() {
    const [rating, setRating] = useState(5)

    const handleRatingChange = (event) => {
        setRating(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('userId');


        const ratingData = {
            userId: userId,
            rating: rating,
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <h1>Please rate your mood today on a scale of 1-10</h1>
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
                <button type="submit">Submit</button>
            </form>
        </>
    );
}


export default Form