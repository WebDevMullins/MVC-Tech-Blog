const router = require('express').Router()
const { Post, User } = require('../models')

router.get('/', async (req, res) => {
	try {
		// Get all posts and JOIN with user data
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['name']
				}
			]
		})
		// Serialize data
		const posts = postData.map((post) => post.get({ plain: true }))

		// Pass data into template
		res.render('home', {
			posts,
			logged_in: req.session.logged_in
		})
	} catch (err) {
		res.status(500).json(err)
	}
})

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/success')
		return
	}
	res.render('login')
})

router.get('/signup', (req, res) => {
	res.render('signup')
})

router.get('/success', (req, res) => {
	res.render('success')
})

module.exports = router
