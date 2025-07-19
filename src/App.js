import React, { useState } from "react";
import "./App.css";

function App() {
  const [mood, setMood] = useState("");

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
    </div>
  );
}

export default App;
