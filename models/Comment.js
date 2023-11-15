const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// Define the Comment model by extending Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model with its attributes and options
Comment.init(
	{
		// Comment ID
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		// Comment content
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [3, 200] // Validate content length between 3 and 200 characters
			}
		},
		// Date of comment creation
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		// Post ID to which the comment belongs
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'post', // References the 'post' table
				key: 'id' // References the 'id' column in the 'post' table
			}
		},
		// User ID who created the comment
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
		modelName: 'comment' // Model name in singular form
	}
)

// Export the Comment model for use in other parts of the application
module.exports = Comment
