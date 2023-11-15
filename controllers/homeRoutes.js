const router = require('express').Router()
const { Comment, Post, User } = require('../models')
const withAuth = require('../utils/auth')

// Home route to display all posts
router.get('/', async (req, res) => {
	try {
		// Get all posts and JOIN with user data
		const postData = await Post.findAll({
			include: [{ model: User, attributes: ['name'] }]
		})

		// Serialize data
		const posts = postData.map((post) => post.get({ plain: true }))

		// Render the home template with post data
		res.render('home', { posts, logged_in: req.session.logged_in })
	} catch (err) {
		// Handle server error
		res.status(500).json(err)
	}
})

// Login route
router.get('/login', (req, res) => {
	// Redirect to dashboard if already logged in
	if (req.session.logged_in) {
		res.redirect('/dashboard')
		return
	}

	// Render the login template
	res.render('login')
})

// Signup route
router.get('/signup', (req, res) => {
	// Redirect to dashboard if already logged in
	if (req.session.logged_in) {
		res.redirect('/dashboard')
		return
	}

	// Render the signup template
	res.render('signup')
})

// Individual post route
router.get('/posts/:id', async (req, res) => {
	try {
		// Get post details and associated comments with user data
		const postData = await Post.findOne({
			where: { id: req.params.id },
			attributes: ['id', 'title', 'content', 'date_created', 'user_id'],
			include: [
				{
					model: Comment,
					attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
					include: { model: User, attributes: ['name'] }
				},
				{ model: User, attributes: ['name'] }
			]
		})

		// Handle case where no post is found
		if (!postData) {
			res.status(404).json({ message: 'No post found with this id' })
			return
		}

		// Serialize post data and render the post template
		const post = postData.get({ plain: true })
		res.render('post', { post, logged_in: req.session.logged_in })
	} catch (err) {
		// Handle server error
		res.status(500).json(err)
	}
})

// Export the router for use in other parts of the application
module.exports = router
