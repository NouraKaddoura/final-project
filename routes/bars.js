const
    express = require('express'),
    barsRouter = new express.Router(),
    Bar = require('../models/Bar.js'),
    { verifyToken } = require('../serverAuth.js')

barsRouter.get('/', (req,res) => {
    Bar.find({}).populate('user').exec((err, bars) => {
        res.json(bars)
    })
})

barsRouter.use(verifyToken)
barsRouter.post('/', (req, res) => {
    console.log(req.user)
    //new bar will be ceated including all fields from form 
    //plus a user key, which is the current user
    Bar.create({...req.body, user: req.user}, (err, bar) => {
        res.json({success: true, message: "bar created"})
    })
})
module.exports = barsRouter