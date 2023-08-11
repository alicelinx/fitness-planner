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
    <>
      <br></br>
      {deleteWorkout &&
        <div class="alert alert-success" role="alert">
          Workout deleted!
        </div>}
      <h3>My Workout</h3>
      <div className="container">
        {workOutData.map(workout => (
          <WorkoutItem workoutId={workout.id} key={workout.id} title={workout.title} fetchWorkouts={fetchWorkouts} setDeleteWorkout={setDeleteWorkout} />
        ))}
      </div>
    </>
  );
};

export default WorkoutList;
