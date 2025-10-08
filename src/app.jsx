import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Habits } from "./habit/habit";
import { Scores } from "./scores/scores";
import { About } from "./about/about";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="bg-primary text-white py-3">
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="h3 m-0">My Habits</h1>
            <nav>
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link text-white" href="index.html">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="habits.html">
                    My Habits
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="scores.html">
                    Scores
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="about.html">
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>App components go here</main>

        <footer className="bg-dark text-white mt-auto py-3">
          <div className="container d-flex justify-content-between align-items-center">
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
