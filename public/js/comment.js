// Function to handle form submission for adding a new comment
const commentFormHandler = async (e) => {
	e.preventDefault() // Prevent the default form submission behavior

	// Get the content and post_id from the form
	const content = document.querySelector('#comment').value.trim()
	const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

	// Check if the content is not empty
	if (content) {
		// Send a POST request to the server to add a new comment
		const response = await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				content,
				post_id
			}),
			headers: { 'Content-Type': 'application/json' }
		})

		// Check if the server response is successful
		if (response.ok) {
			// Reload the page to show the updated comments
			document.location.reload()
		} else {
			// Display an alert with the status text if the response is not ok
			alert(response.statusText)
		}
	}
}

// Add an event listener to the comment form to trigger the commentFormHandler on submit
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler)
