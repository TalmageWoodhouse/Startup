import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Habits } from "./habits/habits";
import { Scores } from "./scores/scores";
import { About } from "./about/about";

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-primary">
            <div className="navbar-brand">My Habits</div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="habits">
                  Habits
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="scores">
                  Scores
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="about">
                  About
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/habits" element={<Habits />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white mt-auto py-3">
          <div className="container-fluid">
            <span>Talmage</span>
            <a
              href="https://github.com/TalmageWoodhouse/Startup"
              className="text-white text-decoration-none"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
