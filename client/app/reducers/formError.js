const initialState = {
  errorsArray: [],
  isShowFormErrors: undefined
};
export default function formError(state = initialState, action) {
	switch (action.type) {
		case 'PUSH_FORM_ERROR':
			var newErrorsArray = state.errorsArray.slice(0, state.errorsArray.length);
			newErrorsArray.push(action.payload)
			var newState = Object.assign({}, state, {errorsArray: newErrorsArray});
			return newState;
		case 'RESET_FORM_ERROR':
			var newState = Object.assign({}, state, {errorsArray: []});
			return newState;
		case 'DISPLAY_FORM_ERROR':
			var newState = Object.assign({}, state, {isShowFormErrors: true});
			return newState;
		case 'HIDE_FORM_ERROR':
			var newState = Object.assign({}, state, {isShowFormErrors: false});
			return newState;
		default:
			return state;
	}
}