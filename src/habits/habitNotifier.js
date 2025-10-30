const HabitEvent = {
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
  handlers = [];

  addHandler(handler) {}
}
