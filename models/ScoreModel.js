var mongoose = require("mongoose");
// const UserSchema = require("./UserModel");

var ScoreSchema = new mongoose.Schema({
  user: String,
  // status: Number,
  statusName: String,
  recordDate: Date
});
mongoose.model("Scores", ScoreSchema);
