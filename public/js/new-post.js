// Function to handle form submission for creating a new post
const newPostFormHandler = async (e) => {
	e.preventDefault() // Prevent the default form submission behavior

	// Get the title and content from the form
	const title = document.querySelector('#title').value.trim()
	const content = document.querySelector('#content').value.trim()

	// Check if content is not empty
	if (content) {
		// Send a POST request to the server to create a new post
		const response = await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify({
				title,
				content
			}),
			headers: { 'Content-Type': 'application/json' }
		})

		// Check if the server response is successful
		if (response.ok) {
			// Redirect to the dashboard after successful creation of a new post
			document.location.replace('/dashboard')
		} else {
			// Display an alert with the status text if the response is not ok
			alert(response.statusText)
		}
	}
}

// Add an event listener to the new post form to trigger the newPostFormHandler on submit
document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler)
