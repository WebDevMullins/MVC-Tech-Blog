const router = require('express').Router()
const { Comment, Post, User } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
	try {
		const postData = await Post.create({
			title: req.body.title,
			content: req.body.content,
			user_id: req.session.user_id
		})
		res.status(200).json(postData)
	} catch (err) {
		res.status(500).json(err)
	}
})

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

router.get('/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.findOne({
			where: {
				id: req.params.id
			},
			attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
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
		if (!postData) {
			res.status(404).json({ message: 'No post found with this id' })
			return
		}
		const post = postData.get({ plain: true })
		console.log(post)
		res.render('post', { post, logged_in: req.session.logged_in })
	} catch (err) {
		res.status(500).json(err)
	}
})

router.put('/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.update(
			{
				title: req.body.title,
				content: req.body.content
			},
			{
				where: {
					id: req.params.id
				}
			}
		)
		if (!postData) {
			res.status(404).json({ message: 'No post found with this id' })
			return
		}
		res.status(200).json(postData)
	} catch (err) {
		res.status(500).json(err)
	}
})

router.delete('/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.destroy({
			where: {
				id: req.params.id
			}
		})
		if (!postData) {
			res.status(404).json({ message: 'No post found with this id' })
			return
		}
		res.status(200).json(postData)
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router
