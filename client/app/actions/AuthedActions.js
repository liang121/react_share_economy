import jquery from 'jquery';
import axios from 'axios';
export function LoginRequest(payload) {
	return (dispatch) => {
		dispatch(requestAuthUser(payload));
	}
}
export function SetAuthRole(response) {
	return {
		type: 'SET_AUTH_ROLE',
		payload: response.data
	}
}
export function ResetAuth() {
	return {
		type: 'RESET_AUTH'
	}
}
function requestAuthUser(payload) {
	return (dispatch) => {
		axios(
			{
				method: 'POST',
	        	url: 'http://localhost:3000/api/signIn',
	        	data: {
	        		userName: payload.userName,
	        		password: payload.password
	            }
	        }
        ).then((data) => {
        	return dispatch(afterReceiveData(data));
        })
    }
}
function afterReceiveData(data) {
	return (dispatch) => {
		dispatch(afterRequestLogin(data));
		dispatch(SetAuthRole(data))
	}
}
function afterRequestLogin(response) {
	return {
		type: 'AUTH_USER_REQUEST',
		payload: response.data
	}
}
