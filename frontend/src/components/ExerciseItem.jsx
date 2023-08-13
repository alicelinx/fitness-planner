import '../styles/WorkoutItem.scss';
import '../styles/ExerciseItem.scss';
const ExerciseItem = (props) => {


  return (
    <div className="exercise-container">
      <span>{props.title}</span>
      <span>{props.reps} reps</span>
      <span>{props.sets} sets</span>
      <span>{props.weight} lbs</span>
    </div>
  );


};


export default ExerciseItem;