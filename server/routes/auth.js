const express = require('express');
const user = require('../models/User');
const getPost = require('../models/post');
const router = express.Router();
const bcrypt = require('bcrypt');

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    const { fname, lname, email, password, gender, Age, PhoneNum } = req.body;
    console.log(
      'Sign Up:',
      fname,
      lname,
      email,
      password,
      gender,
      Age,
      PhoneNum
    );

    // Check if email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
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
    console.log('User saved');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sign in route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Sign In:', email, password);

    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ error: 'Email not registered' });
    }

    // Check password
    const checkPass = await bcrypt.compare(password, foundUser.password);
    if (!checkPass) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    foundUser.password = undefined; // Remove password from response
    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create post
router.post('/post', async (req, res) => {
  try {
    const { userName, postVal, postSub, comments } = req.body;
    console.log('Create Post:', userName, postVal, postSub, comments);

    const newPost = new getPost({
      user: userName,
      postVal,
      postSub,
      comments,
    });

    const newPostSave = await newPost.save();
    res.status(200).json(newPostSave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create post comment
router.put('/addComment', async (req, res) => {
  try {
    const { updatepostId, userComment, comment } = req.body;
    console.log('Add Comment:', updatepostId, userComment, comment);

    const updatedPost = await getPost.findByIdAndUpdate(
      updatepostId,
      { $push: { comments: { userComment, comment } } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(updatedPost);
    console.log('Post updated');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get posts
router.get('/getposts', async (req, res) => {
  try {
    const posts = await getPost.find();
    console.log('Get Posts:', posts);
    res.json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete post
router.delete('/deletePost/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    console.log('Delete Post:', postId);

    const deletedPost = await getPost.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete comment by post ID and comment index
router.delete('/deleteComment/:postId/:commentIndex', async (req, res) => {
  try {
    const { postId, commentIndex } = req.params;
    console.log('Delete Comment:', postId, commentIndex);

    const post = await getPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.splice(commentIndex, 1); // Remove the comment at the specified index
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await user.find();
    console.log('Get Users:', users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user by ID
router.delete('/deleteUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Delete User:', userId);

    const deletedUser = await user.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
