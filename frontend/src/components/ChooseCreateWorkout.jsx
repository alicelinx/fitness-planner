import React, { useState } from "react";
import CreateWorkoutGpt from "./CreateWorkoutGpt";
import CreateWorkout from "./CreateWorkout";
import "../styles/ChooseCreateWorkout.scss";

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
    <div className="choose-create-workout-container">
      <div className="choose-create-workout">
        <div className="button ai" onClick={handleAICreateClick}>Create Workout with AI</div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="button manual" onClick={handleManualCreateClick}>Create Workout Manually</div>
      </div>

      {showAIWorkout && <CreateWorkoutGpt />}
      {showManualWorkout && <CreateWorkout />}
    </div>
  );
};

export default ChooseCreateWorkout;
