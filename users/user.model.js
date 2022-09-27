const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  notificationCount: { type: Number, default: 0 },
  role: {
    type: String,
    enum: ["admin", "moderator", "analyst", "submitter", "practitioner"],
    default: "practitioner",
  },
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("User", UserSchema);
