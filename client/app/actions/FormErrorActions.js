export function pushFormError(error) {
	return {
		type: 'PUSH_FORM_ERROR',
		payload: error
	}
}
export function resetFormErrors() {
	return {
		type: 'RESET_FORM_ERROR',
		payload: []
	}
}
export function displayOrHideErrors(isDisplay) {
	var type = '';
	type = isDisplay ? 'DISPLAY_FORM_ERROR' : 'HIDE_FORM_ERROR';
	return {
		type: type
	}
}