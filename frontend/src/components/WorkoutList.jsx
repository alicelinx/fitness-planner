import React, { useEffect, useState } from 'react';
import WorkoutItem from './WorkoutItem';
import '../styles/WorkoutList.scss';

const WorkoutList = () => {
  const userId = localStorage.getItem('id');
  const [workOutData, setWorkOutData] = useState([]);

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

  useEffect(() => {
    fetchWorkouts();
  }, [userId]);

  return (
    <>
      <br></br>
      <h3>My Workout</h3>
      <div className="container">
        {workOutData.map(workout => (
          <WorkoutItem workoutId={workout.id} key={workout.id} title={workout.title} fetchWorkouts={fetchWorkouts} />
        ))}
      </div>
    </>
  );
};

export default WorkoutList;
