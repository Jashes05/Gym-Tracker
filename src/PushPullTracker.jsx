import React, { useState, useEffect } from "react";

const workoutPlan = {
  Monday: [
    { name: "Barbell Bench Press", sets: 4 },
    { name: "Overhead Dumbbell Press", sets: 4 },
    { name: "Incline Dumbbell Press", sets: 3 },
    { name: "Cable Chest Fly", sets: 3 },
    { name: "Dumbbell Lateral Raise", sets: 3 },
    { name: "Dumbbell Front Raise", sets: 3 },
    { name: "Rope Tricep Pushdown", sets: 3 },
  ],
  Wednesday: [
    { name: "Deadlift", sets: 4 },
    { name: "Pull-Ups / Lat Pulldown", sets: 4 },
    { name: "Barbell Bent-Over Row", sets: 3 },
    { name: "Seated Cable Row", sets: 3 },
    { name: "Dumbbell Bicep Curl", sets: 3 },
    { name: "Hammer Curls", sets: 3 },
    { name: "Face Pulls", sets: 3 },
  ],
  Friday: [
    { name: "Barbell Back Squat", sets: 4 },
    { name: "Romanian Deadlift", sets: 3 },
    { name: "Walking Dumbbell Lunges", sets: 3 },
    { name: "Leg Press / Step-Ups", sets: 3 },
    { name: "Seated Leg Curl", sets: 3 },
    { name: "Standing Calf Raise", sets: 3 },
    { name: "Cable Crunch", sets: 3 },
    { name: "Hanging Leg Raise", sets: 3 },
    { name: "Plank Hold", sets: 3 },
  ],
  Saturday: [
    { name: "Smith Incline Press", sets: 4 },
    { name: "Arnold Press", sets: 4 },
    { name: "Dumbbell Upright Row", sets: 3 },
    { name: "Cable Lateral Raise", sets: 3 },
    { name: "Skullcrushers", sets: 3 },
    { name: "Dips", sets: 3 },
    { name: "Overhead Cable Triceps Extension", sets: 3 },
  ],
  Tuesday: [
    { name: "Badminton (1 hr)", sets: 1 },
    { name: "Plank", sets: 3 },
    { name: "Bicycle Crunches", sets: 3 },
    { name: "Russian Twists", sets: 3 },
    { name: "Mountain Climbers", sets: 3 },
  ],
  Thursday: [
    { name: "Badminton (1 hr)", sets: 1 },
    { name: "Hanging Leg Raises", sets: 3 },
    { name: "Leg Tucks", sets: 3 },
    { name: "Side Plank", sets: 2 },
    { name: "Seated In-and-Outs", sets: 3 },
  ],
  Sunday: [
    { name: "Badminton (light, 45 mins)", sets: 1 },
    { name: "Stretching & Yoga", sets: 1 },
  ],
};

export default function PushPullTracker() {
  const [progress, setProgress] = useState({});
  const [weights, setWeights] = useState({});
  const [reps, setReps] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (startTime) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  const toggleSet = (day, i, j) => {
    const key = `${day}-${i}-${j}`;
    setProgress(prev => ({ ...prev, [key]: !prev[key] }));
    if (!startTime) setStartTime(Date.now());
  };

  const updateReps = (day, index, value) => {
    const key = `${day}-${index}`;
    setReps(prev => ({ ...prev, [key]: value }));
  };

  const updateWeights = (day, index, value) => {
    const key = `${day}-${index}`;
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const totalSets = Object.values(workoutPlan).flat().reduce((acc, cur) => acc + cur.sets, 0);
  const completedSets = Object.values(progress).filter(Boolean).length;

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '1rem', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div>⏱️ Time Elapsed: {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s</div>
        <div>✅ Completed Sets: {completedSets} / {totalSets}</div>
      </div>
      {Object.entries(workoutPlan).map(([day, exercises]) => (
        <div key={day} style={{ marginBottom: '2rem' }}>
          <h2>{day} Workout</h2>
          {exercises.map((ex, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold' }}>{ex.name}</div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                {Array.from({ length: ex.sets }).map((_, j) => (
                  <label key={j}>
                    <input
                      type="checkbox"
                      checked={progress[`${day}-${i}-${j}`] || false}
                      onChange={() => toggleSet(day, i, j)}
                    /> S{j + 1}
                  </label>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input
                  type="number"
                  placeholder="Reps"
                  value={reps[`${day}-${i}`] || ""}
                  onChange={(e) => updateReps(day, i, e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={weights[`${day}-${i}`] || ""}
                  onChange={(e) => updateWeights(day, i, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
