// Import required modules and libraries
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const path = require('path')
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const routes = require('./controllers')
const helpers = require('./utils/helpers')

// Create an Express application
const app = express()

// Set the port to either the environment's port or 3001
const PORT = process.env.PORT || 3001

// Create an instance of Handlebars with custom helpers
const hbs = exphbs.create({ helpers })

// Configure session settings
const sess = {
	secret: 'Secret', // Secret key for session data
	cookie: {
		maxAge: 120000, // Session max age in milliseconds (2 minutes)
		httpOnly: true, // Restrict cookie access to HTTP only
		secure: false, // Allow cookies to be sent over non-HTTPS connections (for development)
		sameSite: 'strict' // Ensure cookies are only sent in a first-party context
	},
	resave: false, // Do not save session data if not modified
	saveUninitialized: true, // Save uninitialized sessions (e.g., new sessions)
	store: new SequelizeStore({
		db: sequelize // Use Sequelize to store session data in the database
	})
}

// Use the configured session middleware
app.use(session(sess))

// Configure Handlebars as the view engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// Set up middleware for handling JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

// Use the defined routes
app.use(routes)

// Sync the Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`App now listening on port ${PORT}`))
})
