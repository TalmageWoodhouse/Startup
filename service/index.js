const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const DB = require("./database.js");

const authCookieName = "token";

// service port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON parsing
app.use(express.json());

app.use(cookieParser());

app.use(express.static("public"));

// router path for endpoints
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await findUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("email", req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  if (field === "token") {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// helper function to
async function getUserFromCookie(req) {
  const token = req.cookies[authCookieName];
  return await findUser("token", token);
}

// ---------------- HABITS ENDPOINTS ----------------

// Get all habits for the logged-in user
apiRouter.get("/habits", verifyAuth, async (req, res) => {
  const user = await getUserFromCookie(req);
  if (!user) return res.status(401).send({ msg: "Unauthorized" });

  const habits = await DB.getHabits(user.email);
  res.send(habits);
});

// Add a new habit
apiRouter.post("/habits", verifyAuth, async (req, res) => {
  const user = await getUserFromCookie(req);
  if (!user) return res.status(401).send({ msg: "Unauthorized" });

  if (!req.body.name)
    return res.status(400).send({ msg: "Missing habit name" });

  const habit = {
    id: uuid.v4(),
    userEmail: user.email,
    name: req.body.name,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  await DB.addHabit(habit);
  res.send(habit);
});

// Mark a habit as completed
apiRouter.post("/habits/complete", verifyAuth, async (req, res) => {
  const user = await getUserFromCookie(req);
  if (!user) return res.status(401).send({ msg: "Unauthorized" });

  if (!req.body.habit)
    return res.status(400).send({ msg: "Missing habit name" });

  const completion = {
    userEmail: user.email,
    habit: req.body.habit,
    date: new Date().toISOString(),
  };

  await DB.addCompletedHabit(completion);
  const streak = await DB.updateOrGetStreak(user.email);
  res.send({ streak });
});

// Get current streak
apiRouter.get("/scores", verifyAuth, async (_req, res) => {
  const streak = await DB.updateOrGetStreak();
  res.send({ streak });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
