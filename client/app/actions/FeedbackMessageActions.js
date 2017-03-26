export function pushMessage(message) {
	return {
		type: 'PUSH_MESSAGE',
		payload: message
	}
}
export function clearMessage() {
	return {
		type: 'CLEAR_MESSAGE',
	}
}