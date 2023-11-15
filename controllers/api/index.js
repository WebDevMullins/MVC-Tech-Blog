const router = require('express').Router()
const commentRoutes = require('./commentRoutes')
const postRoutes = require('./postRoutes')
const userRoutes = require('./userRoutes')

// Use the respective route modules for specific API endpoints
router.use('/comments', commentRoutes) // Use commentRoutes for '/comments' endpoint
router.use('/posts', postRoutes) // Use postRoutes for '/posts' endpoint
router.use('/users', userRoutes) // Use userRoutes for '/users' endpoint

// Export the router for use in other parts of the application
module.exports = router
