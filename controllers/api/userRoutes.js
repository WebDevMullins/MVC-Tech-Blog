const router = require('express').Router()
const { User } = require('../../models')

// Route to create a new user
router.post('/', async (req, res) => {
	try {
		// Create a new user with the provided data
		const userData = await User.create(req.body)

		// Set user ID and login status in the session
		req.session.user_id = userData.id
		req.session.logged_in = true

		// Save the session and respond with the created user data
		req.session.save(() => {
			res.status(200).json(userData)
		})
	} catch (err) {
		// Handle validation or server error
		res.status(400).json(err)
	}
})

// Route to handle user login
router.post('/login', async (req, res) => {
	try {
		// Find a user by email
		const userData = await User.findOne({
			where: { email: req.body.email }
		})

		// Check if the user exists
		if (!userData) {
			res.status(400).json({ error: 'Incorrect email or password, please try again' })
			return
		}

		// Check if the provided password is valid
		const validPassword = await userData.checkPassword(req.body.password)

		if (!validPassword) {
			res.status(400).json({ error: 'Incorrect email or password, please try again' })
			return
		}

		// Set user ID and login status in the session
		req.session.user_id = userData.id
		req.session.logged_in = true

		// Save the session and respond with the user data
		req.session.save(() => {
			res.json({ user: userData, message: 'You are now logged in!' })
		})
	} catch (err) {
		// Handle validation or server error
		res.status(400).json(err)
	}
})

// Route to handle user logout
router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		// Destroy the session on logout
		req.session.destroy(() => {
			res.status(204).end()
		})
	} else {
		// Respond with 404 if not logged in
		res.status(404).end()
	}
})

// Export the router for use in other parts of the application
module.exports = router
