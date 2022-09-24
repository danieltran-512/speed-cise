require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.if7ny5t.mongodb.net/test`;
//process.env.MONGODB_URI
// mongoose
//     .connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true })
//     .catch(e => {
//         console.error('Connection error', e.message)
//     })

// const db = mongoose.connection

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
  // TODO
  Practice: require("../practices/practice.model"),
  User: require("../users/user.model"),
  Claim: require("../claims/claim.model"),
  Article: require("../articles/article.model"),
  Rating: require("../ratings/rating.model"),
};
