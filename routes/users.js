const
	express = require('express'),
	usersRouter = new express.Router(),
	usersCtrl = require('../controllers/users.js'),
	verifyToken = require('../serverAuth.js').verifyToken

usersRouter.route('/')
	.get(usersCtrl.index)
	.post(usersCtrl.create)
	

usersRouter.post('/authenticate', usersCtrl.authenticate)


usersRouter.use(verifyToken)

usersRouter.get('/me', usersCtrl.me)


usersRouter.route('/:id')
	.get(usersCtrl.show)
	.patch(usersCtrl.update)
	.post(usersCtrl.addMentor)  //is this where I add the mentor?
	.delete(usersCtrl.deleteMentor)
	.delete(usersCtrl.destroy)

module.exports = usersRouter