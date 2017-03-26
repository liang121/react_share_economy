const initialState = {
  messageContents: []
};
export default function departments(state = initialState, action) {
	switch (action.type) {
		case 'PUSH_MESSAGE':
			var messageContents = state.messageContents.splice(0, state.messageContents.length);
			messageContents.push(action.payload);
			var newState = Object.assign({}, state, {messageContents: messageContents});
			return newState;
		case 'CLEAR_MESSAGE':
			var messageContents = [];
			var newState = Object.assign({}, state, {messageContents: messageContents});
			return newState;
		default:
			return state;
	}
}