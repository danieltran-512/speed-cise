const express = require("express");
const router = express.Router();
const ratingService = require("./rating.service");
const { authorize } = require("../_helpers/authorize");

// routes
router.get("/", authorize(), getAll);
router.get("/getRatingsForArticle/:id", authorize(), getRatingsForArticle);
router.post("/addRating", authorize(), addRating);
router.put("/updateRating", authorize(), updateRating);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function addRating(req, res, next) {
  ratingService
    .addRating(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  ratingService
    .getAll()
    .then((ratings) => res.json(ratings))
    .catch((err) => next(err));
}

function getRatingsForArticle(req, res, next) {
  ratingService
    .getRatingsForArticle(req.params.id)
    .then((ratings) => res.json(ratings))
    .catch((err) => next(err));
}

function updateRating(req, res, next) {
  ratingService
    .updateRating(req.body)
    .then((rating) => (rating ? res.json(rating) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  ratingService
    .delete(req.params.id)
    .then((rating) => (rating ? res.json(rating) : res.sendStatus(404)))
    .catch((err) => next(err));
}
