// Import the Comment, Post, and User models
const Comment = require('./Comment')
const Post = require('./Post')
const User = require('./User')

// Define associations between models using Sequelize's ORM

// Comment belongs to both Post and User
Comment.belongsTo(Post, {
	foreignKey: 'post_id', // Foreign key in Comment model referencing Post
	onDelete: 'cascade' // If associated Post is deleted, delete the Comment (cascade delete)
})

Comment.belongsTo(User, {
	foreignKey: 'user_id', // Foreign key in Comment model referencing User
	onDelete: 'cascade' // If associated User is deleted, delete the Comment (cascade delete)
})

// Post belongs to User and has many Comments
Post.belongsTo(User, {
	foreignKey: 'user_id', // Foreign key in Post model referencing User
	onDelete: 'cascade' // If associated User is deleted, delete the Post (cascade delete)
})

Post.hasMany(Comment, {
	foreignKey: 'post_id', // Foreign key in Comment model referencing Post
	onDelete: 'cascade' // If associated Post is deleted, delete all associated Comments (cascade delete)
})

// User has many Comments and Posts
User.hasMany(Comment, {
	foreignKey: 'user_id', // Foreign key in Comment model referencing User
	onDelete: 'cascade' // If associated User is deleted, delete all associated Comments (cascade delete)
})

User.hasMany(Post, {
	foreignKey: 'user_id' // Foreign key in Post model referencing User
})

// Export the models for use in other parts of the application
module.exports = { Comment, Post, User }
