import '../styles/Modal.scss';
import { useEffect } from "react";

const Modal = ({ setIsModalOpen, workoutId }) => {


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
        console.log(data);
      } catch (error) {
        console.error({ error });
      }
    };

    fetchExercises();
  }, []);




  return (
    <>
      <div className='modal-container'>
        <button className='modal-close-button' onClick={() => setIsModalOpen(false)}> X </button>

        <h1>hello</h1>
      </div>
    </>
  );
};

export default Modal;