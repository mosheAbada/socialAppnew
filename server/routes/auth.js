const express = require('express');
const user = require('../models/User');
const getPost = require('../models/post');
const router = express.Router();
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const { connection } = require('mongoose');

//sign up route
router.post('/signup', async (req, res) => {
  try {
    const { fname, lname, email, password, gender, Age, PhoneNum } = req.body;
    console.log(fname, lname, email, password, gender, Age, PhoneNum);
    // hash Password
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new user({
      firstname: fname,
      lastname: lname,
      email,
      password: hashPass,
      gender,
      Age,
      PhoneNum,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
    console.log('user saved');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//sign in route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req);
    const foundUser = await user.findOne({ email: email });
    console.log(foundUser);
    if (!foundUser) {
      return res.status(400).json({ msg: 'email not found' });
    }
    //check pass with encrypt pass
    const checkpass = await bcrypt.compare(password, foundUser.password);
    foundUser.password = '';
    console.log('pass ' + foundUser);
    if (!checkpass) {
      return res.status(400).json({ msg: 'password is not correct' });
    }

    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create post
router.post('/post', async (req, res) => {
  try {
    const { userName, postVal, postSub, comments } = req.body;
    console.log(userName, postVal, postSub);
    const newPost = getPost({
      user: userName,
      postVal,
      postSub,
      comments,
    });
    const newpostsave = newPost.save();
    res.status(200).json(newpostsave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//create post comment
router.put('/addComment', async (req, res) => {
  try {
    const { updatepostId, userComment, comment } = req.body;
    console.log(updatepostId, comment);
    console.log(userComment);
    const updatedPost = await getPost.findByIdAndUpdate(
      updatepostId,
      { $push: { comments: { userComment, comment } } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json('updatedPost');
    console.log('Post updated');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get post
router.get('/getposts', async (req, res) => {
  try {
    const posts = await getPost.find();
    console.log(posts);
    res.json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
