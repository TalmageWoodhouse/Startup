import React from "react";

export function Scores() {
  const [completed, setCompleted] = React.useState([]);

  // Load completed habits from localStorage
  React.useEffect(() => {
    const completedText = localStorage.getItem("completed");
    if (completedText) {
      setCompleted(JSON.parse(completedText));
    }
  }, []);

  // Get today's date in the same format as stored
  const today = new Date().toLocaleDateString();

  // Count how many completions each user has today
  const userTaskCounts = {};

  for (const entry of completed) {
    const user = entry.name || "Unknown";
    const date = entry.date;

    if (date === today) {
      if (!userTaskCounts[user]) {
        userTaskCounts[user] = 0;
      }
      userTaskCounts[user] += 1; // Count every completion
    }
  }

  // Convert to array and sort by number of tasks (descending)
  const sortedUsers = Object.entries(userTaskCounts).sort(
    (a, b) => b[1] - a[1]
  );

  // Generate table rows
  const scoreRows = [];
  if (sortedUsers.length) {
    for (const [i, [user, count]] of sortedUsers.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{user.split("@")[0]}</td>
          <td>{count} ✅</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key="0">
        <td colSpan="3">No tasks completed today!</td>
      </tr>
    );
  }

  return (
    <main className="container flex-grow-1 my-4">
      <h3 className="text-center mb-4">Today's Task Completions</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-danger">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Total Tasks Completed Today</th>
            </tr>
          </thead>
          <tbody>{scoreRows}</tbody>
        </table>
      </div>
    </main>
  );
}
