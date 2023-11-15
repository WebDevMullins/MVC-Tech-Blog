// Function to handle form submission for editing a post
const editPostFormHandler = async (e) => {
	e.preventDefault() // Prevent the default form submission behavior

	// Get the title, content, and post ID from the form and URL
	const title = document.querySelector('#title').value.trim()
	const content = document.querySelector('#content').value.trim()
	const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

	// Send a PUT request to the server to update the specified post
	const response = await fetch(`/api/posts/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			post_id: id,
			title,
			content
		}),
		headers: { 'Content-Type': 'application/json' }
	})

	// Check if the server response is successful
	if (response.ok) {
		// Redirect to the dashboard after successful update
		document.location.replace('/dashboard/')
	} else {
		// Display an alert with the status text if the response is not ok
		alert(response.statusText)
	}
}

// Add an event listener to the edit post form to trigger the editPostFormHandler on submit
document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler)
