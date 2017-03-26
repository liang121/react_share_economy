const initialState = {
  criteriaArray: []
};
export default function searchCriteria(state = initialState, action) {
	switch (action.type) {
		case 'PUSH_CRITERIA':
			var newCriteriaArray = state.criteriaArray.slice(0, state.criteriaArray.length);
			newCriteriaArray.push(action.payload);
			var newState = Object.assign({}, state, {criteriaArray: newCriteriaArray});
			return newState;
		case 'DELETE_CRITERIA':
			var newCriteriaArray = state.criteriaArray.slice(0, state.criteriaArray.length);
			var index;
			for (var i=0; i<newCriteriaArray.length; i++) {
				if (newCriteriaArray[i].criteriaValue === action.payload) {
					index = i;
				}
			}
			newCriteriaArray.splice(index,1); 
			var newState = Object.assign({}, state, {criteriaArray: newCriteriaArray});
			return newState;
		case 'CLEAR_ALL_CRITERIAS':
			var newState = Object.assign({}, state, {criteriaArray: []});
			return newState;
		default:
			return state;
	}
}