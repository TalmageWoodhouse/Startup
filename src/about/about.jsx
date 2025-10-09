import React from "react";

export function About() {
  return (
    <main className="container flex-grow-1 my-4 text-center">
      <div id="picture" className="mb-4">
        <img
          src="/motivation.jpg"
          alt="Habit tracker pic"
          className="img-fluid rounded"
          style={{ maxWidth: "400px" }}
        />
      </div>

      <p className="lead mb-4">
        This simple habit tracker is your dream come true. It is the simplest
        way to get you headed down the path that is going to bring absolute
        success. Use this habit tracker as a tool to fuel your days with
        productivity and satisfaction.
      </p>

      <div id="quote" className="fst-italic h5">
        "Anime quote"
      </div>
    </main>
  );
}
