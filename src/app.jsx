import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Habits } from "./habits/habits";
import { Scores } from "./scores/scores";
import { About } from "./about/about";
import { AuthState } from "./login/authState";

export default function App() {
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || ""
  );
  const currentAuthState = userName
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="body d-flex flex-column min-vh-100">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-primary">
            <div className="navbar-brand">My Habits</div>
            <div className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="">
                  Login
                </NavLink>
              </li>
              {authState === AuthState.Athenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="habits">
                    Habits
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Athenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="scores">
                    Scores
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="about">
                  About
                </NavLink>
              </li>
            </div>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path="/habits" element={<Habits userName={userName} />} />
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
