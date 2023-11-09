const { Post } = require('../models')

const postData = [
	{
		title: 'Introduction to HTML5',
		content: 'Learn the basics of HTML5 and how to structure your web content.',
		user_id: 1
	},
	{
		title: 'JavaScript Fundamentals',
		content: 'Explore the fundamentals of JavaScript and how it powers interactivity on the web.',
		user_id: 2
	},
	{
		title: 'Responsive Web Design Techniques',
		content: 'Discover techniques for creating responsive and mobile-friendly web designs.',
		user_id: 3
	},
	{
		title: 'Node.js and Express.js for Backend Development',
		content: 'Build powerful backend applications using Node.js and the Express.js framework.',
		user_id: 1
	},
	{
		title: 'Exploring Frontend Frameworks: React vs. Vue',
		content: 'Compare and contrast React.js and Vue.js to choose the right frontend framework for your project.',
		user_id: 2
	}
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts
