import React from "react";
import "./habits.css";

export function Habits() {
  const [habits, setHabits] = React.useState([]);
  const [completedHabits, setCompletedHabits] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState(["Wed"]);

  React.useEffect(() => {
    const habitsData = localStorage.getItem("habits");
    const friendsData = localStorage.getItem("friends");
    const completedData = localStorage.getItem("completed");

    if (friendsData) setFriends(JSON.parse(friendData));
    if (habitsData) setScores(JSON.parse(habitsData));
    if (completedData) setCompletedHabits(JSON.parse(completedData));
  }, []);

  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

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
              <div className="card p-3 text-center">{habit.name}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No habits yet — add one!</p>
        )}
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

      {/* Add Habit Button */}
      <div className="mt-4 text-center">
        <button
          className="btn btn-primary"
          onClick={() => alert("Feature coming soon!")}
        >
          Add New Habit
        </button>
      </div>
      {/* Friends Section */}
      <div className="websocket mt-5">
        <h4>Friends:</h4>
        {friends.length > 0 ? (
          <ul className="list-group">
            {friends.map((f, index) => (
              <li className="list-group-item" key={index}>
                <span className="player-event">{f.name}</span> got their{" "}
                {f.habit} streak up to {f.streak}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No friend activity yet</p>
        )}
      </div>
    </main>
  );
}
