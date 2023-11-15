// Import Sequelize library
const Sequelize = require('sequelize')

// Load environment variables from a .env file
require('dotenv').config()

// Create a new Sequelize instance with the provided database configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: 'localhost', // Database host (change if your database is hosted elsewhere)
	dialect: 'mysql', // Database dialect (e.g., mysql, postgres, sqlite)
	port: 3306 // Database port (change if your database server uses a different port)
})

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize
