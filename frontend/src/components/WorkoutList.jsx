import React, { useEffect, useState } from 'react';
import WorkoutItem from './WorkoutItem';

const WorkoutList = () => {
  const userId = localStorage.getItem('id');
  const [workOutData, setWorkOutData] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/workouts/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setWorkOutData(data);
      } catch (error) {
        console.error({ error });
      }
    };

    fetchWorkouts();
  }, [userId]);

  return (
    <div className="container">
      {workOutData.map(workout => (
        <WorkoutItem key={workout.id} title={workout.title} />
      ))}
    </div>
  );
};

export default WorkoutList;
