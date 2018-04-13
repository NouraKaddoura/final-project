const User = require('../models/User.js')
const Post = require('../models/Post.js')
const signToken = require('../serverAuth.js').signToken

module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			res.json(users)
		})
	},

	// get one user
	show: (req, res) => {
		console.log("Current User:")
		console.log(req.user)
		User.findById(req.params.id, (err, user) => {
			res.json(user)
		})
	},

	// create a new user
	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			// once user is created, generate a token to "log in":
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token})
		})
	},

	// update an existing user
	update: (req, res) => {
		User.findById(req.params.id)
			.populate('mentors')
			.populate('mentees')
			.exec((err, user) => {
				Object.assign(user, req.body)
				user.save()
				Post.find({ user }, (err, posts) => {
					res.json({...user.toObject(), posts})
				})
			})
	},

	// delete an existing user
	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			res.json({success: true, message: "User deleted.", user})
		})
	},

	// the login route
	authenticate: (req, res) => {
		// check if the user exists
		User.findOne({email: req.body.email}, (err, user) => {
			// if there's no user or the password is invalid
			if(!user || !user.validPassword(req.body.password)) {
				// deny access
				return res.json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
	},

	addMentor: (req, res) =>{
		User.findById(req.params.id, (err, user) =>{
			if(!user.mentees.includes(req.user.id)) {
				user.mentees.push(req.user.id)
				console.log(req.params.id, req.user._id)
				user.save((err)=> {
					req.user.mentors.push(req.params.id)
					req.user.save((err, updatedUser)=>{
						res.json({ success: true, mentor: user, user: updatedUser})
					})
				})
			} else {
				res.json({ success: false, user})
			}
		})
	},

	deleteMentor:(req, res) => {
		User.findById(req.params.id, (err, user)=>{
			if(!user.mentees.includes(req.user.id)){
				const menteeIndex = user.mentees.findIndex((m) => req.user.id)
				user.mentees.splice(menteeIndex, 1)
				user.save((err)=>{
					const mentorIndex = req.user.mentors.findIndex((m) => req.params.id)
					req.user.mentors.splice(mentorIndex, 1)
					req.user.save((err)=>{
						res.json({ success: true, user: req.user})
					})
				})
			} else {
				res.json({ success: false, user})
			}
		})
		
		
		// User.findById(req.params.id)
		// 	.populate('mentors')
		// 	.populate('mentees')
		// 	.exec((err, user) => {
		// if(!user.mentees.includes(req.user._id))
		// user.findById(req.params._id).splice()
			
		// })	
	},

	me: (req, res) => {
		User.findById(req.user._id)
			.populate('mentors')
			.populate('mentees')
			.exec((err, user) => {
				Post.find({ user }, (err, posts) => {
					res.json({...user.toObject(), posts})
				})
			})
	}
}