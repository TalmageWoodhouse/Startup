// import React from "react";

// export function Scores() {
//   const [completed, setCompleted] = React.useState([]);

//   // Load completed habits from localStorage
//   React.useEffect(() => {
//     async function loadScores() {
//       try {
//         const res = await fetch("/api/scores");
//         if (res.ok) {
//           const data = await res.json();
//           setCompleted(data);
//         }
//       } catch (err) {
//         console.error("Error loading scores:", err);
//       }
//     }
//     loadScores();
//   }, []);

//   // Get today's date in the same format as stored
//   const today = new Date().toLocaleDateString();

//   // Count how many completions each user has today
//   const userTaskCounts = {};

//   // Convert to array and sort by number of tasks (descending)
//   const sortedUsers = Object.entries(userTaskCounts).sort(
//     (a, b) => b[1] - a[1]
//   );

//   // Generate table rows
//   const scoreRows = [];
//   if (sortedUsers.length) {
//     for (const [i, [user, count]] of sortedUsers.entries()) {
//       scoreRows.push(
//         <tr key={i}>
//           <td>{i + 1}</td>
//           <td>{user.split("@")[0]}</td>
//           <td>{count} ✅</td>
//         </tr>
//       );
//     }
//   } else {
//     scoreRows.push(
//       <tr key="0">
//         <td colSpan="3">No tasks completed today!</td>
//       </tr>
//     );
//   }

//   return (
//     <main className="container flex-grow-1 my-4">
//       <h3 className="text-center mb-4">Today's Task Completions</h3>
//       <div className="table-responsive">
//         <table className="table table-striped table-bordered text-center">
//           <thead className="table-danger">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Total Tasks Completed Today</th>
//             </tr>
//           </thead>
//           <tbody>{scoreRows}</tbody>
//         </table>
//       </div>
//     </main>
//   );
// }

import React from "react";

export function Scores() {
  const [streak, setStreak] = React.useState(0);

  React.useEffect(() => {
    async function loadScores() {
      try {
        const res = await fetch("/api/scores");
        if (res.ok) {
          const data = await res.json();
          setStreak(data.streak || 0);
        }
      } catch (err) {
        console.error("Error loading streak:", err);
      }
    }
    loadScores();
  }, []);

  return (
    <main className="container flex-grow-1 my-4 text-center">
      <h3 className="mb-3">Your Current Streak 🔥</h3>
      <h1 className="display-3 text-success">{streak}</h1>
      <p>Number of habits completed in a today!</p>
    </main>
  );
}
