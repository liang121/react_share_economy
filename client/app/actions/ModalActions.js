export function launchModal(modal) {
	return {
		type: 'LAUNCH_MODAL',
    	payload: modal,
  	};
}
export function closeModal(modal) {
	return {
		type: 'CLOSE_MODAL',
		payload: modal
	}
}