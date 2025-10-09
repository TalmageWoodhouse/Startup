import React from "react";

export function Login() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center flex-grow-1 m-4">
      <h4 className="mb-4 text-center">
        This is where you take control of your life!
      </h4>
      <form method="get" action="habits.html" className="w-50">
        <div className="mb-3">
          <label className="form-label">User</label>
          <input
            type="text"
            className="form-control"
            placeholder="username/email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
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
    </main>
  );
}
