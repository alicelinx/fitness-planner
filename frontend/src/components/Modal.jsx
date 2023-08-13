import '../styles/Modal.scss';
import { useEffect, useState } from "react";
import ExerciseItem from './ExerciseItem';
import EditModal from './EditModal';

const Modal = ({ isModalOpen, setIsModalOpen, workoutId, workoutTitle, setDeleteWorkout, fetchWorkouts }) => {
  const [exercises, setExercises] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [workoutSaveAlert, setWorkoutSaveAlert] = useState(false);

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

  useEffect(() => {
    fetchExercises();
  }, [isModalOpen, toggleEdit]);

  useEffect(() => {
    if (workoutSaveAlert) {
      setTimeout(() => setWorkoutSaveAlert(false), 1500);
    }
  }, [workoutSaveAlert]);


  const deleteWorkoutRequest = (workoutId) => {
    return fetch(`http://localhost:8080/workouts/${workoutId}`,
      {
        method: "DELETE",
      }
    ).then(_data => {
      setDeleteWorkout(true);
      fetchWorkouts();
    });
  };

  return (
    <>
      <div className='modal-container'>
        <button className='modal-close-button' onClick={() => setIsModalOpen(false)}> X </button>
        {workoutSaveAlert &&
          <div className='alert-container'>
            <div class="alert alert-success" role="alert">
              Workout saved!
            </div>
          </div>}
        <table class="table table-dark">
          <thead>
            <th colSpan="4">
              <h3 className='workout-title'>{workoutTitle}</h3>
              {exercises.map(exercise => (
                <ExerciseItem key={exercise.id} title={exercise.title} sets={exercise.set_number} reps={exercise.rep_number} weight={exercise.weight_number} />
              ))}
            </th>
          </thead>
        </table>
        <div className='edit-and-delete-buttons'>
          <button class="btn btn-outline-success" onClick={() => setToggleEdit(true)}>
            Edit
          </button>
          <button class="btn btn-outline-danger" onClick={() => deleteWorkoutRequest(workoutId)}>
            Delete
          </button>

        </div>

        {toggleEdit && <EditModal setToggleEdit={setToggleEdit} workoutId={workoutId} workoutTitle={workoutTitle} setWorkoutSaveAlert={setWorkoutSaveAlert} fetchExercises={fetchExercises} setExercises={setExercises} />}
      </div>
    </>
  );
};

export default Modal;