const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String // image input Add this line 
});

module.exports = mongoose.model('Post', postSchema);
