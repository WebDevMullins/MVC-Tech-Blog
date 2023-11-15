// Function to handle form submission for user signup
const signupFormHandler = async (e) => {
	e.preventDefault() // Prevent the default form submission behavior

	// Get the name, email, and password from the form
	const name = document.querySelector('#name').value.trim()
	const email = document.querySelector('#email').value.trim()
	const password = document.querySelector('#password').value.trim()

	// Check if name, email, and password are provided
	if (name && email && password) {
		// Send a POST request to the server to create a new user (signup)
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ name, email, password }),
			headers: { 'Content-Type': 'application/json' }
		})

		// Check if the server response is successful
		if (response.ok) {
			// Redirect to the dashboard after successful signup
			document.location.replace('/dashboard')
		} else {
			// Display an alert with the status text if the response is not ok
			alert(response.statusText)
		}
	}
}

// Add an event listener to the signup form to trigger the signupFormHandler on submit
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)
