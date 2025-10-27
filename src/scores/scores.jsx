import React from "react";

export function Scores() {
  const [scores, setScores] = React.useState([]);

  //load scores from local storage
  React.useEffect(() => {
    const scoresText = localStorage.getItem("scores");
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  }, []);

  // generate table rows
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.name?.split("@")[0] || "Unknown"}</td>
          <td>{score.streak || 0}🔥</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key="0">
        <td colSpan="4">Be the first to start a streak!</td>
      </tr>
    );
  }

  return (
    <main className="container flex-grow-1 my-4">
      <h3 className="text-center mb-4">Streaks</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-danger">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>{scoreRows}</tbody>
        </table>
      </div>
    </main>
  );
}
