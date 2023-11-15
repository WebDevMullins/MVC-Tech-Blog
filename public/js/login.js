// Function to handle form submission for user login
const loginFormHandler = async (e) => {
	e.preventDefault() // Prevent the default form submission behavior

	// Get the email and password from the form
	const email = document.querySelector('#email').value.trim()
	const password = document.querySelector('#password').value.trim()

	// Check if both email and password are provided
	if (email && password) {
		// Send a POST request to the server to log in the user
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
		})

		// Check if the server response is successful
		if (response.ok) {
			// Redirect to the dashboard after successful login
			document.location.replace('/dashboard')
		} else {
			// Display an alert for invalid login credentials
			alert('Invalid login credentials, please try again.')
		}
	}
}

// Add an event listener to the login form to trigger the loginFormHandler on submit
document.querySelector('.login-form').addEventListener('submit', loginFormHandler)
