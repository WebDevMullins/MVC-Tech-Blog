// Function to handle form submission for deleting a post
const deletePostFormHandler = async (e) => {
	e.preventDefault() // Prevent the default form submission behavior

	// Get the post ID from the URL
	const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

	// Send a DELETE request to the server to delete the specified post
	const response = await fetch(`/api/posts/${id}`, {
		method: 'DELETE',
		body: JSON.stringify({
			post_id: id
		}),
		headers: { 'Content-Type': 'application/json' }
	})

	// Check if the server response is successful
	if (response.ok) {
		// Redirect to the dashboard after successful deletion
		document.location.replace('/dashboard/')
	} else {
		// Display an alert with the status text if the response is not ok
		alert(response.statusText)
	}
}

// Add an event listener to the delete button to trigger the deletePostFormHandler on click
document.querySelector('#delete-btn').addEventListener('click', deletePostFormHandler)
