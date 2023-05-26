import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css'

function Form() {
    const navigate = useNavigate();
    const [rating, setRating] = useState(5)
    const [sleepQuality, setSleepQuality] = useState(5)
    const [productivityRating, setProductivityRating] = useState(5)
    const [nutritionRating, setNutritionRating] = useState('satisfied-nutritious')

    const handleRatingChange = (e) => {
        setRating(e.target.value)
    };

    const handleSleepQualityChange = (e) => {
        setSleepQuality(e.target.value)
    }

    const handleProductivityRatingChange = (e) => {
        setProductivityRating(e.target.value)
    }

    const handleNutritionRatingChange = (e) => {
        setNutritionRating(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('userId');

        const ratingData = {
            userId: userId,
            rating: rating,
            sleepQuality: sleepQuality,
            productivityRating: productivityRating,
            nutritionRating: nutritionRating
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
      
          <button type="submit">Submit</button>
        </form>
      </div>
      
          );
      }


export default Form