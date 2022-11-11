var mongoose = require('mongoose');

//create Schema
var userSchema = mongoose.Schema({
  uname: String,
  pass: String,
});

var Users = mongoose.model('Users', userSchema); //create a model named Users
module.exports = Users; //export Model
