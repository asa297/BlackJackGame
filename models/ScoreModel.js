var mongoose = require("mongoose");
const UserSchema = require("./UserModel");

var ScoreSchema = new mongoose.Schema({
  user: UserSchema,
  status: Number,
  statusName: String,
  recordDate: Date
});
mongoose.model("Scores", UserSchema);
