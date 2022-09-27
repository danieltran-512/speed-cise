// TODO
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const Practice = db.Practice;

module.exports = {
  addPractice,
  getAll,
  updatePractice,
  delete: _delete,
};

// add a practice
async function addPractice(practiceParam) {
  let doc = await Practice.findOne({
    title: practiceParam.title,
  });
  if (!doc) {
    // make new practice if it doesn't exist already
    doc = new Practice(practiceParam);
  }
  // save practice
  return await doc.save();
}

// read all practices
async function getAll() {
  return await Practice.find();
}

// update practice
async function updatePractice(practiceParam) {
  return await Practice.findByIdAndUpdate(practiceParam.id, {
    title: practiceParam.title,
  });
}

// deletes a practice
async function _delete(id) {
  await Practice.findByIdAndRemove(id);
}
