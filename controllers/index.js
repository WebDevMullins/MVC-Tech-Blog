// Import the Express library and create a router
const router = require('express').Router()

// Import route modules for different parts of the application
const apiRoutes = require('./api') // Routes for API functionality
const homeRoutes = require('./homeRoutes') // Routes for home-related functionality
const dashboardRoutes = require('./dashboardRoutes') // Routes for dashboard-related functionality

// Use the imported route modules for different URL paths
router.use('/', homeRoutes) // Use homeRoutes for the root path '/'
router.use('/api', apiRoutes) // Use apiRoutes for the '/api' path
router.use('/dashboard', dashboardRoutes) // Use dashboardRoutes for the '/dashboard' path

module.exports = router
