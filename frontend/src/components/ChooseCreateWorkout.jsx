import React, { useState, useEffect } from "react";
import CreateWorkoutGpt from "./CreateWorkoutGpt";
import CreateWorkout from "./CreateWorkout";
import "../styles/ChooseCreateWorkout.scss"

const ChooseCreateWorkout = () => {
  const [showAIWorkout, setShowAIWorkout] = useState(false);
  const [showManualWorkout, setShowManualWorkout] = useState(false);

  const handleAICreateClick = () => {
    setShowAIWorkout(true);
    setShowManualWorkout(false);
  };

  const handleManualCreateClick = () => {
    setShowAIWorkout(false);
    setShowManualWorkout(true);
  };

  return (
    <div className="choose-create-workout">
      <button className="create-button" onClick={handleAICreateClick}>Create Workout with AI</button> or{" "}
      <button className="create-button" onClick={handleManualCreateClick}>Create Workout Manually</button>

      {showAIWorkout && <CreateWorkoutGpt />}
      {showManualWorkout && <CreateWorkout />}
    </div>
  );
};

export default ChooseCreateWorkout;
