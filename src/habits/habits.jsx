import React from "react";
import "./habits.css";
import { Friends } from "./friends";

export function Habits(props) {
  const [habits, setHabits] = React.useState([]);
  const [completedHabits, setCompletedHabits] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState(["Wed"]);
  const [newHabitName, setNewHabitName] = React.useState("");

  React.useEffect(() => {
    const habitsData = localStorage.getItem("habits");
    const friendsData = localStorage.getItem("friends");
    const completedData = localStorage.getItem("completed");

    if (friendsData) setFriends(JSON.parse(friendsData));
    if (habitsData) setHabits(JSON.parse(habitsData));
    if (completedData) setCompletedHabits(JSON.parse(completedData));
  }, []);

  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  function addHabit() {
    if (!newHabitName.trim()) return;
    const updatedHabits = [...habits, { name: newHabitName }];
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setNewHabitName("");
  }

  function completeHabit(index) {
    const habitToComplete = habits[index];
    const updatedHabits = habits.filter((_, i) => i !== index);
    const updateCompleted = [...completedHabits, habitToComplete];

    setHabits(updatedHabits);
    setCompletedHabits(updateCompleted);

    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    localStorage.setItem("completed", JSON.stringify(updateCompleted));
  }

  return (
    <main className="container flex-grow-1 my-4">
      <h3 className="mb-3 text-center">Today</h3>
      <p className="text-center">
        {new Date().toDateString().replace(/ (\d{4})$/, ", $1")}
      </p>

      {/* Day Selector */}
      <div className="row g-2 mb-4 text-center">
        {days.map((day) => (
          <div className="col" key={day}>
            <button
              className={`btn w-100 ${
                selectedDay === day ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          </div>
        ))}
      </div>

      {/* Habits Section */}
      <h4 className="mb-3">Habit Tiles</h4>
      <div className="row g-3 mb-4">
        {habits.length > 0 ? (
          habits.map((habit, index) => (
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
        <button
          className="btn btn-primary"
          onClick={() => addHabit("newHabitName")}
        >
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
                {habit.name} ✅
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
