const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// Define the Post model by extending Sequelize's Model class
class Post extends Model {}

// Initialize the Post model with its attributes and options
Post.init(
	{
		// Post ID
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		// Post title
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		// Post content
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		// Date of post creation
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		// User ID who created the post
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user', // References the 'user' table
				key: 'id' // References the 'id' column in the 'user' table
			}
		}
	},
	{
		// Sequelize instance
		sequelize,
		// Configuration options
		timestamps: false, // Disable timestamps (createdAt and updatedAt)
		freezeTableName: true, // Prevent pluralization of table names
		underscored: true, // Use underscores instead of camelCase for column names
		modelName: 'post' // Model name in singular form
	}
)

// Export the Post model for use in other parts of the application
module.exports = Post
