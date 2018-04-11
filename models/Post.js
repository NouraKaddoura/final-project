const
    mongoose = require('mongoose'),
    commentSchema = new mongoose.Schema({
        user: String,
        body: String,
    }, {timestamps: true}),
    postSchema = new mongoose.Schema({
        title: String,
        body: String,
        comments: [commentSchema],
        user: { type: mongoose.Schema.Types.ObjectId, ref:'User'}
    })

  
    const Post = mongoose.model('Post', postSchema)
    module.exports = Post 