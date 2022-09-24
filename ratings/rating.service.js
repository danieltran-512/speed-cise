// TODO
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const Rating = db.Rating;

module.exports = {
  addRating,
  getAll,
  getRatingsForArticle,
  updateRating,
  delete: _delete,
};

// add a rating
async function addRating(ratingParam) {
  let doc = await Rating.findOne({
    articleID: ratingParam.articleID,
    practitionerID: ratingParam.practitionerID,
  });
  if (!doc) {
    // make new rating if it doesn't exist already
    doc = new Rating(ratingParam);
  }
  return await doc.save();
}

// read all ratings
async function getAll() {
  return await Rating.find();
}

// get ratings based on an article
async function getRatingsForArticle(id) {
  return await Rating.find({
    articleID: id,
  });
}

// update rating
async function updateRating(ratingParam) {
  return await Rating.findByIdAndUpdate(ratingParam.id, {
    score: ratingParam.score,
  });
}

// deletes a rating
async function _delete(id) {
  await Rating.findByIdAndRemove(id);
}
