const initialState = {
  modalId: []
};
export default function departments(state = initialState, action) {
	switch (action.type) {
		case 'LAUNCH_MODAL':
			var newModalId = state.modalId.slice(0, state.modalId.length);
			newModalId.push(action.payload);
			var newState = Object.assign({}, state, {modalId: newModalId});
			return newState;
		case 'CLOSE_MODAL':
			var newModalId = state.modalId.slice(0, state.modalId.length);
			var index = newModalId.indexOf(action.payload);
			newModalId.splice(index,1); 
			var newState = Object.assign({}, state, {modalId: newModalId});
			return newState;
		default:
			return state;
	}
}