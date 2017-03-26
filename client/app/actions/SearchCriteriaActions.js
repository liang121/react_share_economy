export function pushSearchCriteria(criteria) {
	return {
		type: 'PUSH_CRITERIA',
    	payload: criteria,
  	};
}
export function deleteSearchCriteria(criteria) {
	return {
		type: 'DELETE_CRITERIA',
		payload: criteria
	}
}
export function clearCriterias() {
	return {
		type: 'CLEAR_ALL_CRITERIAS'
	}
}