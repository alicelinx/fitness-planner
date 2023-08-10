const ExerciseItem = (props) => {
 

  return (
    <div className="container d-flex flex-row justify-content-around align-items-center">
      <h5>Title: {props.title}</h5>
      <h5>Reps: {props.reps}</h5>
      <h5>Sets: {props.sets}</h5>
      <h5>Weight: {props.weight}</h5>
    </div>
  );


};


export default ExerciseItem;