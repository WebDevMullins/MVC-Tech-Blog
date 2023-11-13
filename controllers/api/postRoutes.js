const router = require('express').Router()
const { Comment, Post, User } = require('../../models')

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			attributes: ['id', 'title', 'content', 'date_created'],
			order: [['date_created', 'DESC']],
			include: [
				{
					model: User,
					attributes: ['name']
				},
				{
					model: Comment,
					attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
					include: {
						model: User,
						attributes: ['name']
					}
				}
			]
		})
		res.status(200).json(postData)
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router
