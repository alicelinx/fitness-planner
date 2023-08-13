import { useState, useEffect } from 'react';
import '../styles/EditModal.scss';

const EditModal = ({ setToggleEdit, workoutId, workoutTitle, setWorkoutSaveAlert, setExercises }) => {
  const userId = localStorage.getItem("id");
  const [newWorkoutTitle, setNewWorkoutTitle] = useState(workoutTitle);
  const [formError, setFormError] = useState(false);
  const [rows, setRows] = useState([]);
  const [allExercises, setAllExercises] = useState([]);

  const updateTitle = ({ id, title }) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          title,
        };
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  };

  const updateReps = ({ id, reps }) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          reps,
        };
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  };

  const updateSets = ({ id, sets }) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          sets,
        };
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  };

  const updateWeights = ({ id, weights }) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          weights,
        };
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  };

  const saveWorkout = () => {
    const workoutData = {
      title: newWorkoutTitle, // Replace with the actual workout title from your form
      exercises: rows.map((row) => ({
        id: row.id,
        title: row.title,
        reps: row.reps,
        sets: row.sets,
        weights: row.weights,
      })),
      workoutId,
    };

    return fetch(`http://localhost:8080/workouts/edit/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const hasBlankFields = rows.some(
      (row) =>
        row.title === "" ||
        row.title === "Select Exercise" ||
        row.reps === "" ||
        row.sets === "" ||
        row.weights === ""
    );

    if (hasBlankFields || newWorkoutTitle === "") {
      setFormError(true);
      return;
    }

    setFormError(false);
    saveWorkout()
      .then((_data) => {
        setNewWorkoutTitle("");
        setRows([
          {
            id: 0,
            title: "",
            reps: "",
            sets: "",
            weights: "",
          },
        ]);
        return _data.json();
      })
      .then(data => {
        setWorkoutSaveAlert(true);
        setExercises(data);
      })
      .catch((error) => {
        console.error("Error saving workout:", error);
      });
    setToggleEdit(false);
  };

  const fetchWorkoutExercises = async () => {
    try {
      const response = await fetch(`http://localhost:8080/exercises/${workoutId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const newRows = data.map((row => ({
        id: row.id,
        title: row.title,
        reps: row.rep_number,
        sets: row.set_number,
        weights: row.weight_number
      })));
      setRows(newRows);
    } catch (error) {
      console.error({ error });
    }
  };

  const fetchAllExercises = () => {
    return fetch("http://localhost:8080/exercises")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllExercises(data);
      });
  };

  useEffect(() => {
    if (rows.length === 0) {
      fetchWorkoutExercises();
    }

    if (allExercises.length === 0) {
      fetchAllExercises();
    }
  }, []);

  return (
    <div className="edit-modal-container">
      <button className='edit-modal-close-button' onClick={() => setToggleEdit(false)}> X </button>

      <form className="create-workout-form" id="form">
        <div className="edit-workout-container">
          <table class="table table-dark">
            <thead>
              <tr>
                <th colSpan="4">
                  Workout title:{" "}
                  <input
                    className="workoutTitle"
                    value={newWorkoutTitle}
                    onChange={(e) => {
                      setNewWorkoutTitle(e.target.value);
                    }}
                  ></input>
                </th>
              </tr>
              <tr>
                <th scope="col">Exercises</th>
                <th scope="col">Reps</th>
                <th scope="col">Sets</th>
                <th scope="col">Weights</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">
                    <select
                      className="custom-select custom-select-sm"
                      defaultValue=""
                      value={row.title}
                      onChange={(e) =>
                        updateTitle({
                          id: row.id,
                          title: e.target.value,
                        })
                      }
                    >
                      <option value={`${row.title}`}>{row.title}</option>
                      {allExercises.filter(exercise => exercise.title !== row.title).map((exercise) => (
                        <option key={exercise.id} value={exercise.title}>
                          {exercise.title}
                        </option>
                      ))}
                    </select>
                  </th>
                  <td>
                    <input
                      className="reps"
                      value={row.reps}
                      inputMode="numeric"
                      onChange={(e) => {
                        updateReps({
                          id: row.id,
                          reps: e.target.value,
                        });
                      }}
                    ></input>
                  </td>
                  <td>
                    <input
                      className="sets"
                      value={row.sets}
                      inputMode="numeric"
                      onChange={(e) => {
                        updateSets({
                          id: row.id,
                          sets: e.target.value,
                        });
                      }}
                    ></input>
                  </td>
                  <td>
                    <input
                      className="weights"
                      value={row.weights}
                      inputMode="numeric"
                      onChange={(e) => {
                        updateWeights({
                          id: row.id,
                          weights: e.target.value,
                        });
                      }}
                    ></input>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <i class="fa-solid fa-trash"></i>
          <div className="create-workout-buttons">
            <button class="btn btn-outline-info" onClick={handleFormSubmit}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditModal;