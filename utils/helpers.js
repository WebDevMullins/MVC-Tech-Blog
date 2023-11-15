// Export an object with a single function for formatting dates
module.exports = {
	// Function to format a date using the toLocaleDateString method
	format_date: (date) => {
		return date.toLocaleDateString()
	}
}
