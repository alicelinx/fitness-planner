import '../styles/Modal.scss';
import { useEffect, useState } from "react";
import ExerciseItem from './ExerciseItem';

const Modal = ({ setIsModalOpen, workoutId, workoutTitle }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`http://localhost:8080/exercises/${workoutId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error({ error });
      }
    };

    fetchExercises();
  });




  return (
    <>
      <div className='modal-container'>
        <button className='modal-close-button' onClick={() => setIsModalOpen(false)}> X </button>

        <h3>{workoutTitle}</h3>
        {exercises.map(exercise => (
          <ExerciseItem key={exercise.id} title={exercise.title} sets={exercise.set_number} reps={exercise.rep_number} weight={exercise.weight_number} />
        ))}
      </div>
    </>
  );
};

export default Modal;