import { useState } from 'react';
import '../styles/WorkoutItem.scss';
import Modal from './Modal';

const WorkoutItem = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="workout-item">
        <h3 className="text-light">{props.title}</h3>
        <button
          className="btn btn-outline-light"
          onClick={() => {
            setIsModalOpen(true)
          }}

        >
          Details
        </button>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </>
  );


};


export default WorkoutItem;