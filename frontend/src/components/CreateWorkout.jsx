import { useState, useEffect } from 'react';
import '../styles/CreateWorkout.scss';

const CreateWorkout = () => {
  const id = localStorage.getItem('id');
  const [exercises, setExercises] = useState([]);
  const [rows, setRows] = useState([
    {
      id: 0,
      title: "",
      reps: "",
      sets: "",
      weights: ""
    }
  ]);

  useEffect(() => {
    fetch('http://localhost:8080/exercises')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExercises(data);
      });
  }, []);

  const updateTitle = ({ id, title }) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return {
          ...row,
          title
        };
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  };

  const updateReps = ({ id, reps }) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return {
          ...row,
          reps
        };
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  };

  const updateSets = ({ id, sets }) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return {
          ...row,
          sets
        };
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  };

  const updateWeights = ({ id, weights }) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return {
          ...row,
          weights
        };
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { id: rows.length, title: "", reps: "", sets: "", weights: "" }]); // Add a new empty row
  };

  const deleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    console.log(updatedRows);
    setRows(updatedRows);
  };

  const saveWorkout = () => {
    const workoutData = {
      title: 'Workout Title', // Replace with the actual workout title from your form
      exercises: rows.map((row) => ({
        title: row.title,
        reps: row.reps,
        sets: row.sets,
        weights: row.weights,
      })),
    };

    fetch(`http://localhost:8080/workouts/create/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workoutData),
    })
      .then(() => document.getElementById("form").reset())
      // .then((data) => {
      //   console.log(data); // Handle the response data as needed
      // })
      .catch((error) => {
        console.error('Error saving workout:', error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); 
    saveWorkout(); 
  };


  return (
    <>
      <div className='create-workout'>
        <br></br>
        <h3>Create Workout</h3>
        <br></br>
        <form className='create-workout-form' onSubmit={handleFormSubmit} id='form'>
          <div className="create-workout-container">
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Workout title:</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
                <tr>
                  <th scope="col">Exercises</th>
                  <th scope="col">Reps</th>
                  <th scope="col">Sets</th>
                  <th scope="col">Weights</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">
                      <select className="custom-select custom-select-sm" defaultValue="" onChange={(e) => updateTitle({
                        id: row.id,
                        title: e.target.value
                      })}>
                        <option value="">Select Exercise</option>
                        {exercises.map((exercise) => (
                          <option key={exercise.id} value={exercise.title}>
                            {exercise.title}
                          </option>
                        ))}
                      </select>
                    </th>
                    <td><input className='reps' onChange={(e) => {
                      updateReps({
                        id: row.id,
                        reps: e.target.value
                      });
                    }}></input></td>
                    <td><input className='sets' onChange={(e) => {
                      updateSets({
                        id: row.id,
                        sets: e.target.value
                      });
                    }}></input></td>
                    <td><input className='weights' onChange={(e) => {
                      updateWeights({
                        id: row.id,
                        weights: e.target.value
                      });
                    }}></input></td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteRow(row.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <i class="fa-solid fa-trash"></i>
            <div className='create-workout-buttons'>
              <button type="button" class="btn btn-success" onClick={addRow}>Add</button>
              <button type="submit" class="btn btn-light">Save</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateWorkout;