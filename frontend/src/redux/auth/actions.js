export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SIGNUP: 'SIGNUP',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  VERIFY_TOKEN: 'VERIFY_TOKEN',
  VERIFY_TOKEN_SUCCESS: 'VERIFY_TOKEN_SUCCESS',
  VERIFY_TOKEN_FAILURE: 'VERIFY_TOKEN_FAILURE',
};

export function login(userInfo) {
  return {
    type: actionTypes.LOGIN,
    userInfo,
  };
}

export function loginSuccess(accessToken) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    accessToken,
  };
}

export function loginFailure(error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error,
  };
}

export function verifyToken(accessToken) {
  return {
    type: actionTypes.VERIFY_TOKEN,
    accessToken,
  };
}

export function verifyTokenSuccess(accessToken, name, avatar, isAdmin, email) {
  return {
    type: actionTypes.VERIFY_TOKEN_SUCCESS,
    accessToken,
    name,
    avatar,
    isAdmin,
    email,
  };
}

export function verifyTokenFailure() {
  return {
    type: actionTypes.VERIFY_TOKEN_FAILURE,
  };
}

export function signup(userInfo) {
  return {
    type: actionTypes.SIGNUP,
    userInfo,
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}
