const { Comment } = require('../models')

const commentData = [
	{
		content: 'Great insights into HTML5!',
		post_id: 1,
		user_id: 2
	},
	{
		content: 'JavaScript is truly powerful!',
		post_id: 2,
		user_id: 1
	},
	{
		content: 'Responsive design is a game-changer!',
		post_id: 3,
		user_id: 3
	},
	{
		content: 'Node.js and Express.js make backend development enjoyable.',
		post_id: 4,
		user_id: 3
	},
	{
		content: 'I prefer React for its flexibility!',
		post_id: 5,
		user_id: 1
	}
]

const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments
