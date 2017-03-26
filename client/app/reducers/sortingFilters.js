const initialState = {
	sortingFiltersArray: []
}
export default function sortingFilters(state= initialState, action) {
	switch (action.type) {
		case 'INITIAL_SORTING_FILTERS':
			//var newSortingFiltersArray = state.sortingFiltersArray.splice(0, state.sortingFiltersArray.length);
			var newSortingFiltersArray = [];
			for (var i=0; i<action.payload.length; i++) {
				newSortingFiltersArray.push(action.payload[i]);
			}
			var newState = Object.assign({}, state, {sortingFiltersArray: newSortingFiltersArray});
			return newState;
		default:
			return state;
	}
}