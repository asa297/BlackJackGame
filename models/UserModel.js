var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: String
});

mongoose.model("Users", UserSchema);
