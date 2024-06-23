const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  gender: String,
  Age: String,
  PhoneNum: String,
  isAdmin: String,
});
const user = mongoose.model('user_info', userSchema);

module.exports = user;
