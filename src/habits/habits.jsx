import React from "react";
import "./habits.css";
import { Friends } from "./friends";

export function Habits(props) {
  const [habits, setHabits] = React.useState([]);
  const [completedHabits, setCompletedHabits] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const [newHabitName, setNewHabitName] = React.useState("");
  const [streak, setStreak] = React.useState(0);

  React.useEffect(() => {
    async function loadData() {
      try {
        // Load streak
        const streakRes = await fetch("/api/scores");
        if (streakRes.ok) {
          const { streak } = await streakRes.json();
          setStreak(streak || 0);
        }

        // Load habits
        const habitsRes = await fetch("/api/habits");
        if (habitsRes.ok) {
          const data = await habitsRes.json();
          setHabits(data || []);
        }

        // Load completed from backend
        const completedRes = await fetch("/api/habits/completed");
        if (completedRes.ok) {
          const completedData = await completedRes.json();
          setCompletedHabits(Array.isArray(completedData) ? completedData : []);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }

    loadData();
  }, []);

  const activeHabits = habits.filter(
    (habit) => !completedHabits.find((c) => c.habit === habit.name)
  );

  async function addHabit() {
    if (!newHabitName.trim()) return;
    const newHabit = { name: newHabitName };

    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHabit),
      });
      if (res.ok) {
        const updated = await res.json();
        const newHabitsArray = habits.slice();
        newHabitsArray.push(updated);
        setHabits(newHabitsArray);
        setNewHabitName("");
      }
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  }

  async function completeHabit(index) {
    const habitToComplete = activeHabits.find((_, i) => i == index);
    if (!habitToComplete) return;

    const newCompletion = {
      name: props.userName || "Unknown",
      habit: habitToComplete.name,
      date: new Date().toLocaleDateString(),
    };

    setCompletedHabits((oldArray) => [...oldArray, newCompletion]);

    // Increment streak on backend
    try {
      const res = await fetch("/api/habits/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habit: habitToComplete.name }),
      });
    } catch (err) {
      console.error("Error updating streak:", err);
    }
  }

  return (
    <main className="container flex-grow-1 my-4">
      <h3 className="mb-3 text-center">Today</h3>
      <p className="text-center">
        {new Date().toDateString().replace(/ (\d{4})$/, ", $1")}
      </p>

      {/* Habits Section */}
      <h4 className="mb-3">Habit Tiles</h4>
      <div className="row g-3 mb-4">
        {activeHabits.length > 0 ? (
          activeHabits.map((habit, index) => (
            <div className="col-md-4" key={index}>
              <div className="card p-3 text-center">
                <p>{habit.name}</p>
                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => completeHabit(index)}
                >
                  Complete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No habits yet — add one!</p>
        )}
      </div>

      {/* New Habit input */}
      <input
        type="text"
        className="form-control mb-2"
        value={newHabitName}
        onChange={(e) => setNewHabitName(e.target.value)}
        placeholder="Enter new habit"
      />

      {/* Add Habit Button */}
      <div className="mt-4 text-center">
        <button className="btn btn-primary" onClick={addHabit}>
          Add New Habit
        </button>
      </div>

      {/* Completed Section */}
      <h4 className="mb-3">Completed</h4>
      <div className="row g-3 mb-4">
        {completedHabits.length > 0 ? (
          completedHabits.map((habit, index) => (
            <div className="col-md-6" key={index}>
              <div className="card p-3 text-center bg-success text-white">
                {habit.habit} ✅
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No completed habits yet</p>
        )}
      </div>

      {/* Friends Section */}
      <div className="websocket mt-5">
        <Friends userName={props.userName} />
      </div>
    </main>
  );
}
