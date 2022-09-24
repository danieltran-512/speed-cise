const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const Claim = db.Claim;

module.exports = {
  addClaim,
  getAll,
  getClaimsForPractice,
  updateClaim,
  delete: _delete,
};

// add a claim
async function addClaim(claimParam) {
  let doc = await Claim.findOne({
    title: claimParam.title,
    practiceID: claimParam.practiceID,
  });
  if (!doc) {
    // make new claim if it doesn't exist already
    doc = new Claim(claimParam);
  }
  // save claim
  return await doc.save();
}

// get all claims
async function getAll() {
  return await Claim.find();
}

// get all claims for a practice
async function getClaimsForPractice(id) {
  return await Claim.find({
    practiceID: id,
  });
}

// update claim
async function updateClaim(claimParam) {
  return await Claim.findByIdAndUpdate(claimParam.id, {
    title: claimParam.title,
    practiceID: claimParam.practiceID,
  });
}

// delete claim
async function _delete(id) {
  await Claim.findByIdAndRemove(id);
}
