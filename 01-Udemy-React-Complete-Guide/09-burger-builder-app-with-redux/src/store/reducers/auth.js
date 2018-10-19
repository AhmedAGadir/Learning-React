import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
}

const authStart = (prevState, action) => {
	return {
		...prevState,
		error: null,
		loading: true
	}
}

const authSuccess = (prevState, action) => {
	return {
		...prevState,
		token: action.idToken,
		userId: action.userId,
		error: null,
		loading: false
	}
}

const authFail = (prevState, action) => {
	return {
		...prevState,
		error: action.error,
		loading: false
	}
}

const authLogout = (prevState, action) => {
	return {
		...prevState,
		token: null,
		userId: null
	}
}

const setAuthRedirectPath = (prevState, action) => {
	return {
		...prevState,
		authRedirectPath: action.path
	}
}

const reducer = (prevState = initialState, action) => {
	switch(action.type) {
		case actionTypes.AUTH_START: return authStart(prevState, action)
		case actionTypes.AUTH_SUCCESS: return authSuccess(prevState, action)
		case actionTypes.AUTH_FAIL: return authFail(prevState, action)
		case actionTypes.AUTH_LOGOUT: return authLogout(prevState, action)
		case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(prevState, action)
		default: return prevState
	}
}

export default reducer