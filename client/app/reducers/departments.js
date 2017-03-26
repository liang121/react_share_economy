const initialState = {
  departmentsArray: []
};
export default function departments(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_DEPARTMENTS':
			var newState = Object.assign({}, state, {departmentsArray: action.payload});
			return newState;
		default:
			return state;
	}
}