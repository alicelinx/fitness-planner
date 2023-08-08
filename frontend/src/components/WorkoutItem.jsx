const WorkoutItem = (props) => {
  
  



  return (
    <div className="container p-3 mt-2 d-flex flex-row justify-content-between align-items-center border border-2 border-light">
      <h3 className="text-light">{props.title}</h3>
      <h3 className="text-light"> Details</h3>
    </div>
  );


};


export default WorkoutItem;