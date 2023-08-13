import React, { useEffect, useState } from 'react';
import WorkoutItem from './WorkoutItem';
import '../styles/WorkoutList.scss';

const WorkoutList = () => {
  const userId = localStorage.getItem('id');
  const [workOutData, setWorkOutData] = useState([]);
  const [deleteWorkout, setDeleteWorkout] = useState(false);

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

  useEffect(() => {
    if (deleteWorkout) {
      setTimeout(() => setDeleteWorkout(false), 2000);
    }
  }, [deleteWorkout]);

  return (
    <div className="my-workout-container">
      {deleteWorkout &&
        <div className='alert-container'>
          <div className="alert alert-success workout-list" role="alert">
            Workout deleted!
          </div></div>}
      <div className="my-workout-list">
        {workOutData.map(workout => (
          <WorkoutItem workoutId={workout.id} key={workout.id} title={workout.title} fetchWorkouts={fetchWorkouts} setDeleteWorkout={setDeleteWorkout} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
