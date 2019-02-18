var mongoose = require("mongoose");

var ScoreSchema = new mongoose.Schema({
  user: String,
  statusName: String,
  recordDate: Date
});
mongoose.model("Scores", ScoreSchema);
