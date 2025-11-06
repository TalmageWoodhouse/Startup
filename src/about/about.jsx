import React from "react";
import "./about.css";

export function About() {
  const [quote, setQuote] = React.useState("Loading...");
  const [character, setCharacter] = React.useState("");
  const [anime, setAnime] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("/motivation.jpg");

  React.useEffect(() => {
    // Fetch random anime image
    fetch("https://api.waifu.pics/sfw/waifu")
      .then((res) => res.json())
      .then((data) => setImageUrl(data.url))
      .catch(() => console.error("Failed to load anime image."));

    // Fetch anime quote
    fetch("https://animechan.xyz/api/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quote);
        setCharacter(data.character);
        setAnime(data.anime);
      })
      .catch(() => {
        setQuote("Even heroes need rest sometimes.");
        setCharacter("Unknown");
        setAnime("Inspiration");
      });
  }, []);

  return (
    <main className="container flex-grow-1 my-4 text-center">
      <div id="picture" className="mb-4">
        <img
          src={imageUrl}
          alt="Random Anime scene"
          className="img-fluid rounded"
          style={{ maxWidth: "400px", maxHeight: "400px", objectFit: "cover" }}
        />
      </div>

      <p className="lead mb-4">
        This simple habit tracker is your dream come true. It is the simplest
        way to get you headed down the path that is going to bring absolute
        success. Use this habit tracker as a tool to fuel your days with
        productivity and satisfaction.
      </p>

      <div className="quote-box bg-light fst-italic h5 p-3 rounded">
        <p className="quote mb-2">"{quote}"</p>
        <p className="author text-muted">
          — {character}, <em>{anime}</em>
        </p>
      </div>
    </main>
  );
}
