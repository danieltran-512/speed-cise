// TODO
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const claimSchema = new Schema({
  title: { type: String, required: true },
  practiceID: { type: String, required: true },
});

claimSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("claim", claimSchema);
