export const dateFormatter = new Intl.DateTimeFormat('en', {
	month: 'long',
	year: 'numeric',
	hour: 'numeric',
	minute: '2-digit',
	hour12: true,
	second: '2-digit',
	day: '2-digit'
});
