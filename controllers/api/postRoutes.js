const router = require('express').Router()
const { Comment, Post, User } = require('../../models')
const withAuth = require('../../utils/auth')

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
	try {
		// Create a new post with the provided data
		const postData = await Post.create({
			title: req.body.title,
			content: req.body.content,
			user_id: req.session.user_id
		})

		// Respond with the created post data
		res.status(200).json(postData)
	} catch (err) {
		// Handle server error
		res.status(500).json(err)
	}
})

// Route to get all posts
router.get('/', async (req, res) => {
	try {
		// Get all posts with associated user and comments
		const postData = await Post.findAll({
			attributes: ['id', 'title', 'content', 'date_created'],
			order: [['date_created', 'DESC']],
			include: [
				{ model: User, attributes: ['name'] },
				{
					model: Comment,
					attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
					include: { model: User, attributes: ['name'] }
				}
			]
		})

		// Respond with the post data
		res.status(200).json(postData)
	} catch (err) {
		// Handle server error
		res.status(500).json(err)
	}
})

// Route to get a specific post by ID
router.get('/:id', withAuth, async (req, res) => {
	try {
		// Get a specific post with associated user and comments by ID
		const postData = await Post.findOne({
			where: { id: req.params.id },
			attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
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
			res.status(404).json({ message: 'No post found with this id' })
			return
		}

		// Serialize data and render the post template
		const post = postData.get({ plain: true })
		res.render('post', { post, logged_in: req.session.logged_in })
	} catch (err) {
		// Handle server error
		res.status(500).json(err)
	}
})

// Route to update a specific post by ID
router.put('/:id', withAuth, async (req, res) => {
	try {
		// Update the post with the provided data
		const postData = await Post.update(
			{ title: req.body.title, content: req.body.content },
			{ where: { id: req.params.id } }
		)

		// Handle case where no post is found
		if (!postData) {
			res.status(404).json({ message: 'No post found with this id' })
			return
		}

		// Respond with the updated post data
		res.status(200).json(postData)
	} catch (err) {
		// Handle server error
		res.status(500).json(err)
	}
})

// Route to delete a specific post by ID
router.delete('/:id', withAuth, async (req, res) => {
	try {
		// Delete the post by ID
		const postData = await Post.destroy({ where: { id: req.params.id } })

		// Handle case where no post is found
		if (!postData) {
			res.status(404).json({ message: 'No post found with this id' })
			return
		}

		// Respond with a success message
		res.status(200).json(postData)
	} catch (err) {
		// Handle server error
		res.status(500).json(err)
	}
})

// Export the router for use in other parts of the application
module.exports = router
