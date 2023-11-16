// Import Sequelize library
const Sequelize = require('sequelize')

// Load environment variables from a .env file
require('dotenv').config()

let sequelize

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
	sequelize = new Sequelize(
		process.env.DB_NAME, 
		process.env.DB_USER, 
		process.env.DB_PASSWORD, 
	{
		host: 'localhost',
		dialect: 'mysql'
	})
}

module.exports = sequelize
