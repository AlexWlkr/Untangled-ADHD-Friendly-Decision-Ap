import React, { useState } from "react";
import "./App.css";

function App() {
  const [mood, setMood] = useState("");
  const [time, setTime] = useState("");
  const [energy, setEnergy] = useState("");

  return (
    <div className="App">
      <h1>What Should I Do?</h1>
      <p>I need help deciding what to do right now.</p>

      {/* Mood Input */}
      <label htmlFor="mood">Mood:</label>
      <select
        id="mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      >
        <option value="">-- Select your mood --</option>
        <option value="calm">Calm</option>
        <option value="anxious">Anxious</option>
        <option value="bored">Bored</option>
        <option value="restless">Restless</option>
        <option value="motivated">Motivated</option>
      </select>

      {/* Temporary display to test */}
      <p>Your mood: {mood}</p>

        {/* Time Input */}
      <label htmlFor="time">Time Available:</label>
      <select
        id="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="">-- Select time --</option>
           <option value="mini">Less than 5 minutes</option>
        <option value="short">10-20 minutes</option>
        <option value="medium">30–60 minutes</option>
        <option value="long">1+ hour</option>
  </select>
             {/* Temporary display to test */}
      <p>Your time: {time}</p>

       {/* Energy Input */}
      <label htmlFor="energy">Energy Level:</label>
      <select
        id="time"
        value={time}
        onChange={(e) => setEnergy(e.target.value)}
      >
        <option value="">-- Select your energy level --</option>
           <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
  </select>
             {/* Temporary display to test */}
      <p>Your energy: {energy}</p>

    </div>
  );
}

export default App;
