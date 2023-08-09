import '../styles/WorkoutItem.scss';
import Modal from '@mui/material/Modal';

const WorkoutItem = (props) => {





  return (
    <div className="workout-item">
      <h3 className="text-light">{props.title}</h3>
      <button type="button" className="btn btn-outline-light">Details</button>
    </div>
  );


};


export default WorkoutItem;