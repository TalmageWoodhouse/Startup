import React from "react";

export function Login() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center flex-grow-1 m-4">
      <div>
        {authState !== authState.Unknown && <h1>Welcome to My Habits</h1>}

        {authState === authState.Athenticated && (
          <div>
            <h4 className="mb-4">This is where you take control of your life!</h4>
            <p className="lead">Welcome back, {userName}!</p>
            <button className="btn btn-danger" onClick={() => onAuthChange(userName, AuthState.Unauthenticated)}>Logout</button>
          </div>

        )}
        {AuthState === AuthState.Unauthenticated && (
          <form onSubmit={(e) => {
            e.preventDefault();
            const loginUserName = e.target.elements.username.value;
            onAuthChange(loginUserName, AuthState.Authenticated);
          }}
        )}
      
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="username/email"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="password"
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Login
        </button>
        <button type="submit" className="btn btn-secondary">
          Create
        </button>
      </form>
      </div>
    </main>
  );
}
