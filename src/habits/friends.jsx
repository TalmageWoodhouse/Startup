import React from "react";

import { HabitEvent, HabitNotifier } from "../../service/habitNotifier";

export function Friends({ userName }) {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    HabitNotifier.addHandler(handleHabitEvent);

    return () => {
      HabitNotifier.removeHandler(handleHabitEvent);
    };
  }, []);

  function handleHabitEvent(event) {
    setEvents((prev) => {
      let newEvents = [event, ...prev];
      if (newEvents.length > 7) newEvents = newEvents.slice(0, 7);
      return newEvents;
    });
  }

  function createMessageArray() {
    return events.map((event, i) => {
      let message = "";

      if (event.type === HabitEvent.Complete) {
        message = `completed ${event.value.habit} ✅`;
      } else if (event.type === HabitEvent.Add) {
        message = `added a new habit: ${event.value.habit}`;
      } else if (event.type === HabitEvent.System) {
        message = event.value.msg;
      }

      return (
        <div key={i} className="event">
          <span className="friend-event">
            {event.from.split("@")[0]} {message}
          </span>
        </div>
      );
    });
  }

  return (
    <div className="friends-activity">
      <h4>Friends</h4>
      <div id="friend-messages">
        {events.length > 0 ? (
          createMessageArray()
        ) : (
          <p className="text-muted">No friend activity yet</p>
        )}
      </div>
    </div>
  );
}
