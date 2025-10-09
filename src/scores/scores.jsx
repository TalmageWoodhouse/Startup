import React from "react";

export function Scores() {
  return (
    <main className="container flex-grow-1 my-4">
      <h3 className="text-center mb-4">Scores</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-danger">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>TOM</td>
              <td>6🔥</td>
            </tr>
            <tr>
              <td>2</td>
              <td>TAG</td>
              <td>5🔥</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
