require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_helpers/error-handler");
const { authorize, blacklist } = require("./_helpers/authorize");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// API routes TODO
app.use("/practices", require("./practices/practice.controller"));
app.use("/users", require("./users/user.controller"));
app.use("/claims", require("./claims/claim.controller"));
app.use("/articles", require("./articles/article.controller"));
app.use("/ratings", require("./ratings/rating.controller"));

app.get("/logout", authorize(), logout);
// app.get('/login', login);

function logout(req, res, next) {
  blacklist(req, res);
  // .then((msg) => res.json({message: msg}))
  // .catch(err => next(err));
}

// Global error handler
app.use(errorHandler);
// Handle errors.
app.use(function (req, res, next) {
  res.status(404);
  res.json({ error: "endpoint-not-found" });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
