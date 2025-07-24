import React, { useState } from "react";
import "./App.css";
import MovieSuggestion from "./MovieSuggestion";


// Leisure activity suggestions based on time + energy
const leisureSuggestions = {
  mini_low: [
    "Do a 4-7-8 breathing cycle",
    "Smell your favorite candle or perfume",
    "Look at funny memes or photos",
    "Close your eyes and listen to your surroundings for 1 minute",
    "Do 10 seconds of deep stretching"
  ],
  short_medium: [
    "Sketch a doodle with no pressure",
    "Try a 10-minute guided meditation",
    "Water your plants",
    "Make a comfort playlist",
    "Watch a YouTube video"
  ],
  medium_high: [
    "Put on music and dance it out",
    "Take a walk around the block",
    "Cook something fun but simple",
    "Rearrange a small corner of your space",
    "Call a loved one"
  ],
  long_any: [
    "Read a book or comic you enjoy",
    "Try a new recipe",
    "Watch a movie",
    "Do a slow creative task like painting",
    "Play a cozy video game"
  ]
};
// work activity suggestions based on mood + energy
const workSuggestions = {
  calm_low: [
    "Journal quietly for 5 minutes",
    "Organize your thoughts in a notes app",
    "Reflect on a recent win or lesson"
  ],
  calm_high: [
    "Start a creative project",
    "Outline a blog post or brainstorm ideas",
    "Work on a long-term goal"
  ],
  anxious_low: [
    "Do a 5-minute brain dump",
    "Give your workspace a light clean",
    "Take deep breaths and jot down your work worries"
  ],
  anxious_high: [
    "Tackle a simple, low-stakes task",
    "Organize your email inbox",
    "Sort your digital files or desktop"
  ],
  bored_medium: [
    "Try a productivity technique like Pomodoro",
    "Set a silly challenge (e.g. write 10 ideas in 5 minutes)",
    "Reorganize your workspace layout"
  ],
  restless_high: [
    "Do a standing task (like writing ideas on a whiteboard)",
    "Move while working (pace, stretch, stand)",
    "Do quick research for a fun side project"
  ],
  motivated_high: [
    "Start your most important task right away",
    "Work on something with a deadline",
    "Make progress on a passion project"
  ],
  default: [
    "Make a short to-do list",
    "Check your calendar or planner",
    "Spend 5 minutes making a plan"
  ]
};



// Random Helper Function
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Main App component
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

  // Chore function
function getChoreSuggestion() {
  const highEnergy = [
    "Clean a whole room",
    "Do a 15-minute speed clean",
    "Vacuum all floors",
    "Declutter a shelf",
    "Take out the trash + recycling"
  ];

  const mediumEnergy = [
    "Do the dishes",
    "Organize one drawer",
    "Wipe down your desk",
    "Start a laundry load",
    "Put away 10 things"
  ];

  const lowEnergy = [
    "Throw away 3 things",
    "Wipe one surface",
    "Sort one mail pile",
    "Empty your bag or pockets",
    "Clear off one small surface"
  ];

  if (energy === "high") return getRandomItem(highEnergy);
  if (energy === "medium") return getRandomItem(mediumEnergy);
  return getRandomItem(lowEnergy);
}

  // Leisure function
function getLeisureSuggestion() {
  if (time === "mini" && energy === "low") {
    return getRandomItem(leisureSuggestions.mini_low);
  }

  if (time === "short" && energy === "medium") {
    return getRandomItem(leisureSuggestions.short_medium);
  }

  if (time === "medium" && energy === "high") {
    return getRandomItem(leisureSuggestions.medium_high);
  }

  if (time === "long") {
    return getRandomItem(leisureSuggestions.long_any);
  }

  // fallback if combo isn't handled
  return "Take a moment to breathe or do something comforting.";
}

  // work function
function getWorkSuggestion() {
  const key = `${mood}_${energy}`;
  const options = workSuggestions[key] || workSuggestions.default;
  return getRandomItem(options);
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
}
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


React.useEffect(() => {
  const saved = localStorage.getItem("savedSuggestion");
  if (saved) {
    setSavedSuggestion(JSON.parse(saved));
  }
}, []);


  return (
    <div className="App">
      <h1>Untangled</h1>
      <p>🧶 All knots make sense when you pause and check in. Three quick questions. One helpful suggestion.</p>

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
    {/* Show movie picks only if leisure includes "movie" */}
{suggestions.leisure.toLowerCase().includes("movie") && (
  <MovieSuggestion />
)}

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
  <span className="countdown-animate">
    {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:
    {(timeLeft % 60).toString().padStart(2, "0")}
  </span>
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
