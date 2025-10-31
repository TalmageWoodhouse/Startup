import React from "react";

import { AuthState } from "./authState";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center flex-grow-1 m-4">
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to My Habits</h1>}

        {authState === AuthState.Authenticated && (
          <Authenticated
            userName={userName}
            onLogout={() => {
              // Clear user-specific habit data on logout
              localStorage.removeItem("habits");
              localStorage.removeItem("completed");

              onAuthChange(userName, AuthState.Unauthenticated);
            }}
          />
        )}

        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
