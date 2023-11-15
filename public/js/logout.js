// Function to handle user logout
const logout = async () => {
	// Send a POST request to the server to log out the user
	const response = await fetch('/api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	})

	// Check if the server response is successful
	if (response.ok) {
		// Redirect to the home page after successful logout
		document.location.replace('/')
	} else {
		// Display an alert with the status text if the response is not ok
		alert(response.statusText)
	}
}

// Add an event listener to the logout button to trigger the logout function on click
document.querySelector('#logout').addEventListener('click', logout)
