const
	dotenv = require('dotenv').load(),
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/react-express-jwt',
	PORT = process.env.PORT || 3001,
	usersRoutes = require('./routes/users.js'),
	postsRoutes = require('./routes/posts.js'),
	axios = require('axios'),
	httpClient = axios.create(),
	{ verifyToken } = require('./serverAuth.js')
	// mentorsRoutes = require('./routes/mentors.js')

const apiKey = process.env.MEETUP_API_KEY
const sig_id = process.env.sig_id
const sig = process.env.sig
console.log(apiKey)

mongoose.connect(MONGODB_URI, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
	res.json({message: "API root."})
})

app.get('/api/find/groups/', verifyToken, (req, res)=>{
	const apiUrl = `https://api.meetup.com/find/groups?photo-host=public&page=20&zip=${req.user.zip || '90066'}&sig_id=${sig_id}&sig=${sig}`
	const options = { method: 'get', url: apiUrl}
	httpClient(options).then((apiResponse)=>{
		res.json(apiResponse.data)
	})
	.catch(error => {
		console.log(error)
	})
})

app.use('/api/users', usersRoutes)
// app.use('/api/mentors', mentorsRoutes)
app.use('/api/posts', postsRoutes)

app.use('*', (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, (err) => {
	console.log(err || `Server running on port ${PORT}.`)
})