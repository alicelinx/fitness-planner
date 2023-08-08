const WorkoutItem = () => {
  
  const userId = localStorage.getItem('id');
  const getWorkoutsById = async (id) => {
    try {
      const workouts = await fetch('http://localhost:8080/workouts', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        }),
      });
      return workouts.json();
    } catch (error) {
      console.error({ error });
    }
  }
  


  

  return (
    <div></div>
  );


};


export default WorkoutItem;