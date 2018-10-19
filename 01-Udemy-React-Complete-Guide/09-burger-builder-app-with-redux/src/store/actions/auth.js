import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		userId: userId
	}
}

const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

const checkAuthTimeout = expirationTime => {
	// running asynchronous code here, so using redux-thunk
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000)
	}
}

export const logout = () => {
	// react protects data in local storage from cross-site scripting attacks,
	// so its safe to store tokens there etc.
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate')
	localStorage.removeItem('userId')
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		// the [API_KEY] in the default URL must be changed to the API_KEY for our firebase project
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAk5TlvSLFRcZmtSnjbUbkiAmLSPE0cT0c'
		if (!isSignUp) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAk5TlvSLFRcZmtSnjbUbkiAmLSPE0cT0c'
		}
		axios.post(url, authData)
			.then(res => {
				console.log(res)
				const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
				localStorage.setItem('token', res.data.idToken)
				localStorage.setItem('expirationDate', expirationDate)
				localStorage.setItem('userId', res.data.localId)
				dispatch(authSuccess(res.data.idToken, res.data.localId))
				dispatch(checkAuthTimeout(res.data.expiresIn))
			})
			.catch(err => {
				// to see the full error, log err.response
				console.log(err.response)
				// the .data.message comes from firebase
				dispatch(authFail(err.response.data.error))
			})
	}
}

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	}
}

export const authCheckState = () => {
	// you can also use the redux thunk syntax when you want to dispatch multiple actions
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			if (expirationDate <= new Date()) {
				dispatch(logout())
			} else {
				const userId = localStorage.getItem('userId')
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
			}
		}
	}
}