import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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

  const toggleSet = (day, exerciseIndex, setIndex) => {
    const key = `${day}-${exerciseIndex}-${setIndex}`;
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateReps = (day, index, value) => {
    const key = `${day}-${index}`;
    setReps((prev) => ({ ...prev, [key]: value }));
  };

  const updateWeights = (day, index, value) => {
    const key = `${day}-${index}`;
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4 grid gap-6">
      {Object.entries(workoutPlan).map(([day, exercises]) => (
        <Card key={day}>
          <CardContent>
            <h2 className="text-xl font-bold mb-2">{day} Workout</h2>
            {exercises.map((exercise, i) => (
              <div key={i} className="mb-4">
                <div className="font-medium">{exercise.name}</div>
                <div className="flex gap-2 mt-1">
                  {Array.from({ length: exercise.sets }).map((_, j) => (
                    <Checkbox
                      key={j}
                      checked={progress[`${day}-${i}-${j}`] || false}
                      onCheckedChange={() => toggleSet(day, i, j)}
                    />
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Reps"
                    className="w-20"
                    value={reps[`${day}-${i}`] || ""}
                    onChange={(e) => updateReps(day, i, e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Weight (kg)"
                    className="w-28"
                    value={weights[`${day}-${i}`] || ""}
                    onChange={(e) => updateWeights(day, i, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
