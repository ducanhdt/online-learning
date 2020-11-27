import { actionTypes } from './actions';

export const initialState = {
  accessToken: null,
  verifying: false,
  error: null,
  name: null,
  avatar: null,
  isAdmin: false,
  email: null,
  isProcessing: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, isProcessing: true, error: null };
    case actionTypes.LOGIN_SUCCESS: {
      const { accessToken } = action;
      return { ...state, accessToken, isProcessing: false, error: null };
    }
    case actionTypes.LOGIN_FAILURE: {
      const { error } = action;
      return { ...state, error, isProcessing: false };
    }
    case actionTypes.VERIFY_TOKEN:
      return { ...state, verifying: true };
    case actionTypes.VERIFY_TOKEN_SUCCESS: {
      const { accessToken, name, avatar, isAdmin, email } = action;
      return {
        ...state,
        verifying: false,
        accessToken,
        name,
        avatar,
        isAdmin,
        email,
      };
    }
    case actionTypes.VERIFY_TOKEN_FAILURE:
      return { ...state, verifying: false };
    case actionTypes.LOGOUT:
      return { ...state, accessToken: null };
    default:
      return state;
  }
}
