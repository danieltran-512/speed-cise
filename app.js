require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_helpers/error-handler");
const { authorize, blacklist } = require("./_helpers/authorize");
// Accessing the path module
const path = require("path");

const port = process.env.PORT || 8082;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

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
/*app.use(function (req, res, next) {
  res.status(404);
  res.json({ error: "endpoint-not-found" });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});*/

if (process.env.NODE_ENV === "production") {
  console.log("if statement reached");
  // Step 1:
  app.use(express.static(path.join(__dirname, "/speed-client/build")));
  // Step 2:
  app.get("*", function (request, response) {
    response.sendFile(
      path.join(__dirname, "speed-client", "build", "index.html")
    );
  });
  console.log("if statement reached again");
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
