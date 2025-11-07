import React from "react";
import "./about.css";

export function About() {
  const [quote, setQuote] = React.useState("Loading...");
  const [character, setCharacter] = React.useState("");
  const [anime, setAnime] = React.useState("");

  React.useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch("https://api.animechan.io/v1/quotes/random");
        const json = await res.json();

        if (json.message && json.message.includes("Too many requests")) {
          throw new Error("Rate limit hit");
        }

        // Adjust for data structure (remove `.data` if not needed)
        const q = json.data || json;
        setQuote(q.content);
        setCharacter(q.character?.name || q.character);
        setAnime(q.anime?.name || q.anime);
      } catch (err) {
        console.error(err);
        setQuote("You've summoned too much wisdom for now. Try again later!");
        setCharacter("The API Gods");
        setAnime("Rate Limit Saga");
      }
    }

    fetchQuote();
  }, []);

  return (
    <main className="container flex-grow-1 my-4 text-center">
      <div id="picture" className="mb-4">
        <img
          src="/motivation.jpg"
          alt="Motivation"
          className="img-fluid rounded shadow"
          style={{ maxWidth: "400px" }}
        />
      </div>

      <p className="lead mb-4">
        This simple habit tracker is your dream come true. It is the simplest
        way to get you headed down the path that is going to bring absolute
        success. Use this habit tracker as a tool to fuel your days with
        productivity and satisfaction.
      </p>

      <div className="quote-box bg-light fst-italic h5 p-3 rounded shadow">
        <p className="quote mb-2">"{quote}"</p>
        <p className="author text-muted">
          — {character}, <em>{anime}</em>
        </p>
      </div>
    </main>
  );
}
