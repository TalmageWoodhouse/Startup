const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("habits");

const userCollection = db.collection("user");
const streakCollection = db.collection("streak");
const habitsCollection = db.collection("habits");
const completedCollection = db.collection("completed");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`
    );
    process.exit(1);
  }
})();

// ------ USER FUNCTIONS -------

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

// ------ HABIT FUNCTIONS ------

// add a new habit
async function addHabit(habit) {
  await habitsCollection.insertOne(habit);
}

// mark a habit as completed
async function addCompletedHabit(completion) {
  await completedCollection.insertOne(completion);
}

// update or get current streak for a given habit
async function updateOrGetStreak(userEmail) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to start of day

  // Count completed habits for this user today
  const count = await completedCollection.countDocuments({
    userEmail,
    date: {
      $gte: today.toISOString(),
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    },
  });

  return count;
}

module.exports = {
  // users
  getUser,
  getUserByToken,
  addUser,
  updateUser,

  //habits
  getHabits,
  addHabit,
  addCompletedHabit,
  updateOrGetStreak,
};
