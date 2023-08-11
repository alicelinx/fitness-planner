import '../styles/WorkoutItem.scss';
const ExerciseItem = (props) => {


  return (
    <div className="container workout-item d-flex flex-row justify-content-around align-items-center">
      <h5>{props.title}</h5>
      <h5>{props.reps} reps</h5>
      <h5>{props.sets} sets</h5>
      <h5>{props.weight} lbs</h5>
    </div>
  );


};


export default ExerciseItem;