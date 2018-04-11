const
    express = require('express'),
    postsRouter = new express.Router(),
    Post = require('../models/Post.js'),
    { verifyToken } = require('../serverAuth.js')

postsRouter.get('/', (req,res) => {
    Post.find({}).populate('user').exec((err, posts) => {
        res.json(posts)
    })
})

postsRouter.use(verifyToken)
postsRouter.post('/', (req, res) => {
    console.log(req.user)
    //new post will be ceated including all fields from form 
    //plus a user key, which is the current user
    Post.create({...req.body, user: req.user}, (err, post) => {
        res.json({success: true, message: "post created"})
    })
    
})

postsRouter.get('/:id', (req, res) => {
    Post.findById(req.params.id).populate('user').exec((err, thatUser) => {
        if(err) return console.log(err)
        res.json(thatUser)
    })
})

postsRouter.get('/:id/edit', (req, res) => {
    res.json({ "message": "posts edit"})
})

postsRouter.patch('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost) => {
        if(err) return console.log(err)
        res.json(updatedPost)
    } )
})

postsRouter.delete('/:id', (req, res)=>{
    Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
        if(err) return console.log(err)
        res.json({"deleted": true})
    })
})

postsRouter.post('/:id/comments', (req, res) =>{
    Post.findById(req.params.id, (err, thatPost)=>{
        console.log(req.user.name)
        req.body.user = req.user.name
        console.log("this is the body", req.body)
        thatPost.comments.push(req.body)
        thatPost.save((err, savedPost) => {
            res.json(savedPost)
        })
    })

})

// postRouter.delete('/:postId/comments/:id', (req, res) => {
//     Post.findById(req.params.postId, (err, thatPost) => {
//         if(err) return console.log(err)
//         console.log(thatPost)
//         thatPost.comments.remove(req.params.id)
//         console.log(thatPost)
//         thatPost.save((err) => {
//             res.redirect(`/projects/${thatPost._id}`)
//         })
//     })

// })
module.exports = postsRouter