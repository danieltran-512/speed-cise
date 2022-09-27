// TODO
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const practiceSchema = new Schema({
  title: { type: String, required: true },
});

practiceSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("practice", practiceSchema);
