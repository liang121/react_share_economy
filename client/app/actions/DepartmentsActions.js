import jquery from 'jquery'
export function fetchDepartmentsArray() {
	return (dispatch) => {
		dispatch(getDepartments());
	}
}
function getDepartments() {
	return (dispatch) => {
		jquery.ajax({
			url: 'http://localhost:3000/api/getDepartments',
	        dataType: 'json',
	        data: {
	           format: 'json',
	        }
		}).done((data) =>{
			return dispatch(afterReceiveDepartmentsData(data));
		}).fail((err) => {
			console.log(err);
		})
	}
}
function afterReceiveDepartmentsData(departments) {
	return {
		type: 'FETCH_DEPARTMENTS',
		payload: departments
	}
}