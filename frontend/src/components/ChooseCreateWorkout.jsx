import React, { useState, useEffect } from "react";
import CreateWorkoutGpt from "./CreateWorkoutGpt";
import CreateWorkout from "./CreateWorkout";

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
    <div>
      <button onClick={handleAICreateClick}>Create Workout with AI</button> or{" "}
      <button onClick={handleManualCreateClick}>Create Workout Manually</button>

      {showAIWorkout && <CreateWorkoutGpt />}
      {showManualWorkout && <CreateWorkout />}
    </div>
  );
};

export default ChooseCreateWorkout;
