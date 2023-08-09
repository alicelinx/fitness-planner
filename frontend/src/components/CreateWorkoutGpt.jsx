import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import "../styles/CreateWorkoutGpt.scss";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const CreateWorkoutGpt = () => {
  const [exercises, setExercises] = useState([]);
  const [rows, setRows] = useState([
    {
      id: 0,
      title: "",
      reps: "",
      sets: "",
      weights: "",
    },
  ]);

  const [selectedGoal, setSelectedGoal] = useState("Strength");
  const [inputText, setInputText] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [selectedWorkoutTitle, setSelectedWorkoutTitle] = useState("");
  const [exercise, setExercise] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      { id: rows.length, title: "", reps: "", sets: "", weights: "" },
    ]); // Add a new empty row
  };

  const deleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    console.log(updatedRows);
    setRows(updatedRows);
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
    setExercise(updatedExercise);
  };

  const deleteExercise = (index) => {
    const updatedExercise = exercise.filter((_, i) => i !== index);
    setExercise(updatedExercise);
  };

  const generateSearchQuery = () => {
    console.log(
      `give me a ${inputText} workout in JSON format, tailored for ${selectedGoal}. MUST be in the format of '{"Workout Title": "reference to the workout name", "Exercises": [{"Exercise":, "Sets":, "Reps":}]}'`
    );
    return `give me a ${inputText} workout in JSON format, tailored for ${selectedGoal}. MUST be in the format of '{"Workout Title": "reference to the workout name", "Exercises": [{"Exercise":, "Sets":, "Reps":}]}'`;
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
        <br></br>
        <h3>Create Workout using AI</h3>
        <br></br>
        <label>Select Workout Goal: </label>
        <select value={selectedGoal} onChange={handleGoalChange}>
          <option value="Strength">Strength</option>
          <option value="Fat loss">Fat loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
        </select>
        <label>Insert muscle group: </label>
        <input
          placeholder="type your search"
          value={inputText}
          onChange={handleMuscleGroupChange}
        />
        <button onClick={handleSearch}>Create</button>
        <br />
        <p>Generated Response</p>
        {generatedResponse}
        {isLoading? (
          <div className="spinner-container">
            <p>Please wait while we generate your workout</p>
            <BeatLoader
              css={override}
              size={100}
              color={"#123abc"}
              loading={isLoading}
            />
          </div>
        ) : (
          generatedResponse && (
            <form className="create-workout-form">
              <div className="create-workout-container">
                      <h2 class="table table-dark">Workout Title:&nbsp;
                      <input
                        value={selectedWorkoutTitle}
                        placeholder="please insert workout title"
                      />
                      </h2>
                <table class="table table-dark">
                  <thead>
                    <tr>
                      {/* <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th> */}
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
                            className="btn btn-danger"
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
                          <input></input>
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
                <div className="create-workout-buttons">
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={addRow}
                  >
                    Add
                  </button>
                  <button type="button" class="btn btn-light">
                    Save
                  </button>
                </div>
              </div>
            </form>
          )
        )}
      </div>
    </>
  );
};

export default CreateWorkoutGpt;

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const chapGPT = async (prompt) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return response["data"]["choices"][0]["message"]["content"];
};
