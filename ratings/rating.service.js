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
  } else {
    // update rating if it exists
    doc.score = ratingParam.score;
  }
  return await doc.save();
}

// read all ratings
async function getAll() {
  return await Rating.find();
}

// get ratings based on an article
async function getRatingsForArticle(id) {
  const ratings = await Rating.find({
    articleID: id,
  });

  // calculate average rating
  let sum = 0;
  
  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i].score;
  }

  let avg = sum / ratings.length;

  const rating = {
    average: avg,
    count: ratings.length,
  }

  return rating;
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
