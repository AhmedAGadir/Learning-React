import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

const authSuccess = authData => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	}
}

const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

// only one that needs to be exported
export const auth = (email, password) => {
	return dispatch => {
		dispatch(authStart());

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		// the [API_KEY] in the default URL must be changed to the API_KEY for our firebase project
		axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAk5TlvSLFRcZmtSnjbUbkiAmLSPE0cT0c',authData)
			.then(res => {
				console.log(res)
				dispatch(authSuccess(res.data))
			})
			.catch(err => {
				console.log(err)
				dispatch(authFail(err))
			})
	}
}