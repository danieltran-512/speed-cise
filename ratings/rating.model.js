// TODO
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  score: { type: Number, required: true },
  articleID: { type: String, required: true },
  practitionerID: { type: String, required: true },
});

ratingSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("rating", ratingSchema);
