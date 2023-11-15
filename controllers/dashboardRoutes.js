const router = require('express').Router()
const sequelize = require('../config/connection')
const { Comment, Post, User } = require('../models')
const withAuth = require('../utils/auth')

// Dashboard route to display the user's posts
router.get('/', withAuth, async (req, res) => {
	try {
		// Find all posts by the user, including associated user and comments
		const postData = await Post.findAll({
			where: { user_id: req.session.user_id },
			attributes: ['id', 'title', 'content', 'date_created'],
			include: [
				{ model: User, attributes: ['name'] },
				{
					model: Comment,
					attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
					include: { model: User, attributes: ['name'] }
				}
			]
		})

		// Serialize data and render the dashboard template
		const posts = postData.map((post) => post.get({ plain: true }))
		res.render('dashboard', { posts, logged_in: true })
	} catch (err) {
		// Handle server error
		res.status(500).json(err)
	}
})

// New post route
router.get('/new', withAuth, (req, res) => {
	// Render the new-post template
	res.render('new-post')
})

// Edit post route
router.get('/edit/:id', withAuth, async (req, res) => {
	try {
		// Find the post by ID, including associated user and comments
		const postData = await Post.findOne({
			where: { id: req.params.id },
			attributes: ['id', 'title', 'content', 'date_created'],
			include: [
				{ model: User, attributes: ['name'] },
				{
					model: Comment,
					attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
					include: { model: User, attributes: ['name'] }
				}
			]
		})

		// Handle case where no post is found
		if (!postData) {
			res.status(400).json({ message: 'No post found with this id' })
			return
		}

		// Serialize data and render the edit-post template
		const post = postData.get({ plain: true })
		res.render('edit-post', { post, logged_in: req.session.logged_in })
	} catch (err) {
		// Handle server error
		console.log(err)
		res.status(500).json(err)
	}
})

// Export the router for use in other parts of the application
module.exports = router
