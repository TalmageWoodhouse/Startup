export const HabitEvent = {
  System: "system",
  Add: "add",
  Complete: "complete",
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class HabitNotifierClass {
  events = [];
  handlers = [];

  constructor() {
    // Simulate friend habit updates every few seconds
    const friendNames = ["John", "Lin", "Cal", "Eich", "Sara"];
    const habits = ["Workout", "Meditate", "Read", "Run", "Drink Water"];

    setInterval(() => {
      const randomFriend =
        friendNames[Math.floor(Math.random() * friendNames.length)];
      const randomHabit = habits[Math.floor(Math.random() * habits.length)];

      const isComplete = Math.random() > 0.5;
      const type = isComplete ? HabitEvent.Complete : HabitEvent.Add;
      const value = { habit: randomHabit };

      this.broadcastEvent(randomFriend, type, value);
    }, 5000);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.receiveEvent(event);
  }

  receiveEvent(event) {
    this.events.push(event);
    this.handlers.forEach((handler) => handler(event));
  }
}

export const HabitNotifier = new HabitNotifierClass();
