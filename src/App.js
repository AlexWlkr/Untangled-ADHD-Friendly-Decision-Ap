import React, { useState } from "react";
import "./App.css";

function App() {
  const [mood, setMood] = useState("");
  const [time, setTime] = useState("");
  const [energy, setEnergy] = useState("");

  // State to hold suggestions
const [suggestions, setSuggestions] = useState({
  chore: "",
  leisure: "",
  work: ""
});
  // State to hold saved suggestion
  const [savedSuggestion, setSavedSuggestion] = useState(null);

    // State to hold timer values
  const [timeLeft, setTimeLeft] = useState(0); // Time in seconds
const [isTimerRunning, setIsTimerRunning] = useState(false);


  //Logic functions to generate suggestions based on mood, time, and energy
function generateSuggestions() {
  if (!mood || !time || !energy) {
    alert("Please fill out all inputs first.");
    return;
  }

  // Basic example logic
  const newSuggestions = {
    chore: getChoreSuggestion(),
    leisure: getLeisureSuggestion(),
    work: getWorkSuggestion()
  };

  setSuggestions(newSuggestions);
}

  function getChoreSuggestion() {
    if (energy === "high") return "Clean a whole room";
    if (energy === "medium") return "Organize one drawer";
    return "Throw away 3 things";
  }

  function getLeisureSuggestion() {
    if (time === "long" && energy === "low") return "Watch a movie";
    if (time === "short") return "Scroll your social media feed";
    return "Listen to your favorite song";
  }

  function getWorkSuggestion() {
    if (mood === "motivated") return "Start a new task";
    if (mood === "anxious") return "Do a 5-minute brain dump";
    return "Make a short to-do list";
  }

    // clear all button function
function clearAll() {
  setMood("");
  setTime("");
  setEnergy("");
  setSuggestions({
    chore: "",
    leisure: "",
    work: ""
  });
  setSavedSuggestion(null);
  localStorage.removeItem("savedSuggestion");
  
     // timer function

  function startTimer() {
  if (isTimerRunning) return;

  setTimeLeft(300); // 5 minutes
  setIsTimerRunning(true);

  const timerInterval = setInterval(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(timerInterval);
        setIsTimerRunning(false);
        alert("🎉 Great job! You showed up for yourself. Keep it going!");
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);
}
}


React.useEffect(() => {
  const saved = localStorage.getItem("savedSuggestion");
  if (saved) {
    setSavedSuggestion(JSON.parse(saved));
  }
}, []);


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
        value={energy}
        onChange={(e) => setEnergy(e.target.value)}
      >
        <option value="">-- Select your energy level --</option>
           <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
  </select>
             {/* Temporary display to test */}
      <p>Your energy: {energy}</p>
{/* Suggestion Button */}
<button onClick={generateSuggestions}>Get Suggestions</button>

{/* Display Suggestions */}
{suggestions.chore && (
  <div className="results">
    <h2>Here's what we suggest:</h2>
    <ul>
      <li><strong>Chore:</strong> {suggestions.chore}</li>
      <li><strong>Leisure:</strong> {suggestions.leisure}</li>
      <li><strong>Work:</strong> {suggestions.work}</li>
    </ul>
    {/* Shuffle + Save + Clear Buttons */}
<div className="button-group">
  <button onClick={generateSuggestions}>🔀 Shuffle</button>
<button
  onClick={() => {
    setSavedSuggestion(suggestions);
    localStorage.setItem("savedSuggestion", JSON.stringify(suggestions));
  }}
>
  💾 Save
</button>

    <button onClick={clearAll}>🧹 Clear All</button>
  {savedSuggestion && (
  <div className="saved">
    <div className="focus-timer">
  <p>This timer helps you stay committed to your choice for at least 5 minutes of focused effort.</p>
  <h3>Focus Timer</h3>
  <p>
    Time Left:{" "}
    {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:
    {(timeLeft % 60).toString().padStart(2, "0")}
  </p>
  <button onClick={startTimer} disabled={isTimerRunning}>
    {isTimerRunning ? "Stay Focused..." : "Start Focus Timer"}
  </button>
</div>

    <h2>Saved Suggestion</h2>
    <ul>
      <li><strong>Chore:</strong> {savedSuggestion.chore}</li>
      <li><strong>Leisure:</strong> {savedSuggestion.leisure}</li>
      <li><strong>Work:</strong> {savedSuggestion.work}</li>
    </ul>
  </div>
)}
</div>
  </div>
)}
    </div>
  );
}

export default App;
