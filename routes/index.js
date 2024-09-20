const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Index Route
// router.get('/', async (req, res) => {
//     const posts = await Post.find({});
//     res.render('index', { posts });
// });

//image input:-
// Index Route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.render('index', { posts });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// New Post Route
router.get('/posts/new', (req, res) => {
    res.render('new');
});

// Create Post Route
router.post('/posts', upload.single('image'), async (req, res) => {
    const { title, content } = req.body.post;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    await Post.create({ title, content, image });
    res.redirect('/');
});

// Show Post Route
router.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('show', { post });
});

// Edit Post Route
router.get('/posts/:id/edit', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post });
});

// Update Post Route
router.put('/posts/:id', upload.single('image'), async (req, res) => {
    const { title, content } = req.body.post;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.existingImage;
    await Post.findByIdAndUpdate(req.params.id, { title, content, image });
    res.redirect(`/posts/${req.params.id}`);
});

// Route to delete a post
router.delete('/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

module.exports = router;
