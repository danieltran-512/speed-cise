const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: Array },
  journal: { type: String },
  publicationYear: { type: Date },
  evidenceResult: { type: String, enum: ["agree", "disagree"] },
  researchType: { type: String },
  participantType: { type: String },
  status: { type: String },
  claimID: { type: String },
  submitterID: { type: String },
  moderatorID: { type: String },
  analystID: { type: String },
});

articleSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("article", articleSchema);
