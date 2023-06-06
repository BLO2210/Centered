import React, { useState } from 'react';
import MoodGraph from './DataGraph';
import UserAverages from './UserAverages';
import './ParentComponent.css';

const ParentComponent = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="parent-component">
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <MoodGraph startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <UserAverages startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default ParentComponent;
