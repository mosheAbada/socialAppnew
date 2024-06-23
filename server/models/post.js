const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: String,
  postVal: String,
  postSub: String,
  comments: [{}],
});
const post = mongoose.model('post_info', postSchema);

module.exports = post;
