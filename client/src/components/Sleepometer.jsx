import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart'
import axios from 'axios';
import moment from 'moment';
import './Sleepometer.css'

const SleepGauge = () => {
    const [chartValue, setChartValue] = useState(0);
    const userId = localStorage.getItem('userId'); // retrieve user ID from local storage

    const fetchAndProcessData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/users/${userId}`);
            const sleepRatings = res.data.moodRatings
                .filter(rating => moment(rating.timestamp).isSame(new Date(), 'week')) // filter for ratings from this week
                .map(rating => rating.sleepQuality); // extract the sleepQuality field

            const totalSleep = sleepRatings.reduce((a, b) => a + b, 0);
            const averageSleep = totalSleep / sleepRatings.length; // calculate average sleep

            setChartValue(averageSleep / 10); // normalize average sleep (assuming sleepQuality is out of 10)
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAndProcessData();
    
        // Watch for changes in localStorage
        const handleStorageChange = () => {
            fetchAndProcessData();
        };
    
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    

    return (
        <div>
            <h2>Average Sleep This Week</h2>
            <GaugeChart id="gauge-chart" 
                        nrOfLevels={10} 
                        percent={chartValue}
                        textColor={"#000000"}
                        needleColor={"#345243"}
                        colors={["orange", "green"]} />
        </div>
    );
};

export default SleepGauge;
