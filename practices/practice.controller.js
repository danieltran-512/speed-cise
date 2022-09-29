const express = require("express");
const router = express.Router();
const practiceService = require("./practice.service");
const { authorize } = require("../_helpers/authorize");

// routes
router.get("/", getAll);
router.post("/addPractice", authorize(), addPractice);
router.put("/updatePractice", authorize(), updatePractice);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function addPractice(req, res, next) {
  practiceService
    .addPractice(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  practiceService
    .getAll()
    .then((practices) => res.json(practices))
    .catch((err) => next(err));
}

function updatePractice(req, res, next) {
  practiceService
    .updatePractice(req.body)
    .then((practice) => (practice ? res.json(practice) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  practiceService
    .delete(req.params.id)
    .then((practice) => (practice ? res.json(practice) : res.sendStatus(404)))
    .catch((err) => next(err));
}
