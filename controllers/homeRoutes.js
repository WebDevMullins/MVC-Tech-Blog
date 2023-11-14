const router = require('express').Router()
const { Comment, Post, User } = require('../models')

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
		res.redirect('/dashboard')
		return
	}
	res.render('login')
})

router.get('/signup', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard')
		return
	}
	res.render('signup')
})

router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findOne({
			where: {
				id: req.params.id
			},
			attributes: ['id', 'title', 'content', 'date_created', 'user_id'],
			include: [
				{
					model: Comment,
					attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
					include: {
						model: User,
						attributes: ['name']
					}
				},
				{
					model: User,
					attributes: ['name']
				}
			]
		})
		if (!postData) {
			res.status(404).json({ message: 'No post found with this id' })
			return
		}
		const post = postData.get({ plain: true })
		res.render('post', { post, logged_in: req.session.logged_in })
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router
