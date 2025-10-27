import React from "react";
import "./habits.css";

export function Habits() {
  const [habits, setHabits] = React.useState([]);
  const [completedHabits, setCompletedHabits] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState(['Wed']);

  React.useEffect(() => )
  return (
    <main className="container flex-grow-1 my-4">
      <h3 className="mb-3 text-center">Today</h3>
      <p className="text-center">Sept. 27, 2025</p>
      <div className="row g-2 mb-4 text-center">
        <div className="col">
          <button className="btn btn-outline-secondary w-100">Mon</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-secondary w-100">Tues</button>
        </div>
        <div className="col">
          <button className="btn btn-primary w-100">Wed</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-secondary w-100">Thurs</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-secondary w-100">Fri</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-secondary w-100">Sat</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-secondary w-100">Sun</button>
        </div>
      </div>

      <h4 className="mb-3">Habit Tiles</h4>
      <div className="row g-3 mb-4">
        <div className="col">
          <div className="card p-3 text-center">Habit #1</div>
        </div>
        <div className="col">
          <div className="card p-3 text-center">Habit #2</div>
        </div>
        <div className="col">
          <div className="card p-3 text-center">Habit #3</div>
        </div>
      </div>

      <h4 className="mb-3">Done</h4>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card p-3 text-center bg-success text-white">
            Habit done
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 text-center bg-success text-white">
            Habit done
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="btn btn-primary">Add New Habit</button>
      </div>

      <div className="websocket mt-4">
        <h4>Friends:</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="player-event">John</span>
            got their homework streak up to 40
          </li>
          <li className="list-group-item">
            <span className="player-event">Lin</span>
            got their workout streak up to 100
          </li>
          <li className="list-group-item">
            <span className="system-event">Cal</span>
            got their walk for 10min streak up to 70
          </li>
        </ul>
      </div>
    </main>
  );
}
