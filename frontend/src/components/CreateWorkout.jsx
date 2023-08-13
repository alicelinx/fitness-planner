import { useState, useEffect } from "react";
import "../styles/CreateWorkout.scss";

const CreateWorkout = () => {
  const userId = localStorage.getItem("id");
  const [exercises, setExercises] = useState([]);
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [isWorkoutSaved, setIsWorkoutSaved] = useState(false);
  const [formError, setFormError] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 0,
      title: "",
      reps: "",
      sets: "",
      weights: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:8080/exercises")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExercises(data);
      });
  }, []);

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

  const addRow = () => {
    setRows([
      ...rows,
      { id: rows.length, title: "", reps: "", sets: "", weights: "" },
    ]); // Add a new empty row
  };

  const deleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    console.log(updatedRows);
    setRows(updatedRows);
  };

  const saveWorkout = () => {
    const workoutData = {
      title: workoutTitle, // Replace with the actual workout title from your form
      exercises: rows.map((row) => ({
        title: row.title,
        reps: row.reps,
        sets: row.sets,
        weights: row.weights,
      })),
    };

    return fetch(`http://localhost:8080/workouts/create/${userId}`, {
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

    if (hasBlankFields || workoutTitle === "") {
      setFormError(true);
      return;
    }

    setFormError(false);

    saveWorkout()
      .then((_data) => {
        setWorkoutTitle("");
        setRows([
          {
            id: 0,
            title: "",
            reps: "",
            sets: "",
            weights: "",
          },
        ]);
        setIsWorkoutSaved(true);
        setTimeout(() => setIsWorkoutSaved(false), 1500);
      })
      .catch((error) => {
        console.error("Error saving workout:", error);
      });
  };

  return (
    <>
      <div className="create-workout">
        <h3>Create Workout</h3>
        {formError && (
          <div className="alert alert-danger" role="alert">
            Please fill out all fields before saving the workout.
          </div>
        )}
        <form className="create-workout-form" id="form">
          <div className="create-workout-container">
            <table class="table table-dark">
              <thead>
                <tr>
                  <th colSpan="5">
                    Workout title:{" "}
                    <input
                      className="workoutTitle"
                      value={workoutTitle}
                      onChange={(e) => {
                        setWorkoutTitle(e.target.value);
                      }}
                    ></input>
                  </th>
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
                        <option value="">Select Exercise</option>
                        {exercises.map((exercise) => (
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
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
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
            <div className="create-workout-buttons">
              <button type="button" class="btn btn-outline-success" onClick={addRow}>
                Add
              </button>
              <button class="btn btn-outline-light" onClick={handleFormSubmit}>
                Save
              </button>
            </div>
          </div>
          <br></br>
          {isWorkoutSaved &&
            <div className='alert-container'>
              <div class="alert alert-success" role="alert">
                Workout saved!
              </div>
            </div>
          }
        </form>
      </div>
    </>
  );
};

export default CreateWorkout;
