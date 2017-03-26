const initialState = {
  authedStatus: undefined,
  authRole: undefined
};
export default function authed(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER_REQUEST':
    	var newState = Object.assign({}, state, {authedStatus: action.payload.status});
      return newState
    case 'CREATE_ACCOUNT_REQUEST': 
    	var newState= action.payload;
    	return Object.assign({}, state, {createStatus: newState.status});
    case 'SET_AUTH_ROLE':
      var newState = Object.assign({}, state, {authRole: action.payload.role});
      return newState;
    case 'RESET_AUTH':
      return initialState
    default:
    	return state;
  }
}