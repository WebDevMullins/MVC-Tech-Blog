const router = require('express').Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// Route to handle the creation of a new comment
router.post('/', withAuth, async (req, res) => {
	try {
		// Create a new comment using the provided data
		const commentData = await Comment.create({
			content: req.body.content,
			post_id: req.body.post_id,
			user_id: req.session.user_id
		})

		// Respond with the created comment data
		res.status(200).json(commentData)
	} catch (err) {
		// Handle validation or server error
		res.status(400).json(err)
	}
})

// Export the router for use in other parts of the application
module.exports = router
