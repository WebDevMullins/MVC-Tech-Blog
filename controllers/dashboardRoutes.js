const router = require('express').Router()
const sequelize = require('../config/connection')
const { Comment, Post, User } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
	try {
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id
			},
			attributes: ['id', 'title', 'content', 'date_created'],
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
		const posts = postData.map((post) => post.get({ plain: true }))
		res.render('dashboard', { posts, logged_in: true })
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router