import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import "../styles/CreateWorkoutGpt.scss";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const CreateWorkoutGpt = () => {
  const userId = localStorage.getItem("id");
  const [exercises, setExercises] = useState([]);
  const [isWorkoutSaved, setIsWorkoutSaved] = useState(false);
  const [rows, setRows] = useState([]);

  const [selectedGoal, setSelectedGoal] = useState("Strength");
  const [inputText, setInputText] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [selectedWorkoutTitle, setSelectedWorkoutTitle] = useState("");
  const [exercise, setExercise] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

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
      { id: Date.now(), title: "", reps: "", sets: "", weights: "" },
    ]);
  };

  const deleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    console.log(updatedRows);
    setRows(updatedRows);
  };

  const saveWorkout = () => {
    const workoutData = {
      title: selectedWorkoutTitle,
      exercises: [
        ...rows.map((row) => ({
          title: row.title,
          reps: row.reps,
          sets: row.sets,
          weights: row.weights,
        })),
        ...exercise.map((row) => ({
          title: row.Exercise,
          reps: row.Reps,
          sets: row.Sets,
          weights: row.Weights,
        })),
      ],
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
    console.log(exercise);
    console.log(rows);

    const hasBlankExercise = exercise.some((exercise) => {
      return (
        String(exercise.Exercise).trim() === "" ||
        String(exercise.Reps).trim() === "" ||
        String(exercise.Sets).trim() === "" ||
        String(exercise.Weights).trim() === ""
      );
    });

    const hasBlankRow = rows.some((row) => {
      return (
        String(row.title).trim() === "" ||
        String(row.reps).trim() === "" ||
        String(row.sets).trim() === "" ||
        String(row.weights).trim() === ""
      );
    });

    const isWorkoutTitleBlank = selectedWorkoutTitle.trim() === "";

    if (hasBlankExercise || hasBlankRow || isWorkoutTitleBlank) {
      setFormError(true);
      return;
    }

    setFormError(false);

    saveWorkout(userId, selectedWorkoutTitle, exercise)
      .then((_data) => {
        setSelectedWorkoutTitle("");
        setRows([
          {
            id: 0,
            title: "",
            reps: "",
            sets: "",
            weights: "",
          },
        ]);
        setExercise([]);
        setIsWorkoutSaved(true);
        setTimeout(() => setIsWorkoutSaved(false), 1500);
      })
      .catch((error) => {
        console.error("Error saving workout:", error);
      });
  };

  const handleGoalChange = (event) => {
    setSelectedGoal(event.target.value);
  };

  const handleMuscleGroupChange = (event) => {
    setInputText(event.target.value);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercise = exercise.map((exercise, i) => {
      if (i === index) {
        return {
          ...exercise,
          [field]: value,
        };
      }
      return exercise;
    });

    const hasBlankWeight = updatedExercise.some(
      (exercise) => String(exercise.Weights).trim() === ""
    );

    setFormError(hasBlankWeight);

    setExercise(updatedExercise);
  };

  const deleteExercise = (index) => {
    const updatedExercise = exercise.filter((_, i) => i !== index);
    setExercise(updatedExercise);
  };

  const generateSearchQuery = () => {
    console.log(
      `give me a ${inputText} workout in JSON format, tailored for ${selectedGoal}. MUST be in the format of '{"Workout Title": "reference to the workout name", "Exercises": [{"Exercise":, "Sets":, "Reps":, "Weights":"leave empty"}]}'`
    );
    return `give me a ${inputText} workout in JSON format, tailored for ${selectedGoal}. MUST be in the format of '{"Workout Title": "reference to the workout name", "Exercises": [{"Exercise":, "Sets":, "Reps":, , "Weights":"leave empty"}]}'`;
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const query = generateSearchQuery();
      const response = await chapGPT(query);
      setGeneratedResponse(response);
      setIsLoading(false);

      const jsonResponse = JSON.parse(response);
      const workoutTitle = jsonResponse["Workout Title"];
      setSelectedWorkoutTitle(workoutTitle);
      const workoutExercises = jsonResponse["Exercises"];

      if (Array.isArray(workoutExercises)) {
        setExercise(workoutExercises);
      } else {
        setExercise([]); // Set an empty array if the response is not an array
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="create-workout">
        <h3>Create Workout using AI</h3>
        <div className="gpt-input-container">
          <div>
            <label>Select Workout Goal:</label>&nbsp;&nbsp;
            <select
              className="select-goal"
              value={selectedGoal}
              onChange={handleGoalChange}
            >
              <option value="Strength">Strength</option>
              <option value="Fat loss">Fat loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
            </select>
          </div>
          <div>
            <label>Insert Muscle Group:</label>&nbsp;&nbsp;
            <input
              className="muscle-group-input"
              placeholder="e.g. Legs"
              value={inputText}
              onChange={handleMuscleGroupChange}
            />
          </div>
          <br />
          <button className="btn btn-outline-info" onClick={handleSearch}>
            Create
          </button>
        </div>
        <br />
        {formError && (
          <div className="alert alert-danger" role="alert">
            Please fill out all fields before saving the workout.
          </div>
        )}
        {isLoading ? (
          <div className="spinner-container">
            <p>Please wait while we generate your workout</p>

            <BeatLoader
              css={override}
              size={30}
              color={"#ffffff"}
              loading={isLoading}
            />
          </div>
        ) : (
          generatedResponse && (
            <form className="create-workout-form" id="form">
              <div className="create-workout-container">
                <table class="table table-dark">
                  <thead>
                    <tr>
                      <th colSpan="5">
                        Workout title:{" "}
                        <input
                          className="workoutTitle"
                          value={selectedWorkoutTitle}
                          onChange={(e) => {
                            setSelectedWorkoutTitle(e.target.value);
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
                    {exercise.map((exercise, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <input
                            className="exercise-name"
                            value={exercise.Exercise}
                            onChange={(e) =>
                              handleExerciseChange(
                                index,
                                "Exercise",
                                e.target.value
                              )
                            }
                          />
                        </th>
                        <td>
                          <input
                            className="reps"
                            value={exercise.Reps}
                            onChange={(e) =>
                              handleExerciseChange(
                                index,
                                "Reps",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="sets"
                            value={exercise.Sets}
                            onChange={(e) =>
                              handleExerciseChange(
                                index,
                                "Sets",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="weights"
                            value={exercise.Weights}
                            onChange={(e) =>
                              handleExerciseChange(
                                index,
                                "Weights",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => deleteExercise(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {rows.map((row) => (
                      <tr key={row.id}>
                        <th scope="row">
                          <input
                            defaultValue=""
                            value={row.title}
                            onChange={(e) =>
                              updateTitle({
                                id: row.id,
                                title: e.target.value,
                              })
                            }
                          ></input>
                        </th>
                        <td>
                          <input
                            className="reps"
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
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    onClick={addRow}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-light"
                    onClick={handleFormSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
              <br></br>
              {isWorkoutSaved && (
                <div className="alert-container">
                  <div class="alert alert-success" role="alert">
                    Workout saved!
                  </div>
                </div>
              )}
            </form>
          )
        )}
      </div>
    </>
  );
};

export default CreateWorkoutGpt;

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chapGPT = async (prompt) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return response["data"]["choices"][0]["message"]["content"];
};
