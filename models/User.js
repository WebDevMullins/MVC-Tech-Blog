const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

// Define the User model by extending Sequelize's Model class
class User extends Model {
	// Method to check if the provided password matches the stored hashed password
	checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password)
	}
}

// Initialize the User model with its attributes and options
User.init(
	{
		// User ID
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		// User name
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 30] // Validate name length between 2 and 30 characters
			}
		},
		// User email
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true, // Ensure email is unique
			validate: {
				isEmail: true // Validate that the email is in the correct format
			}
		},
		// User password (hashed)
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4] // Validate password length (minimum length of 4)
			}
		}
	},
	{
		// Hooks to run before creating and updating a user
		hooks: {
			beforeCreate: async (newUserData) => {
				// Hash the password before creating a new user
				newUserData.password = await bcrypt.hash(newUserData.password, 10)
				return newUserData
			},
			beforeUpdate: async (newUserData) => {
				// Hash the password before updating a user
				newUserData.password = await bcrypt.hash(newUserData.password, 10)
				return newUserData
			}
		},
		// Sequelize instance
		sequelize,
		// Configuration options
		timestamps: false, // Disable timestamps (createdAt and updatedAt)
		freezeTableName: true, // Prevent pluralization of table names
		underscored: true, // Use underscores instead of camelCase for column names
		modelName: 'user' // Model name in singular form
	}
)

// Export the User model for use in other parts of the application
module.exports = User
