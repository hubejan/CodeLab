// @flow
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/auth-actions';

type authErrorType = {
  error: string,
  error_description: string,
  error_uri: string
};

type loginStateType = {
  username: ?string,
  token: ?string,
  error: {} | authErrorType,
  loggedIn: boolean
};

type loginSuccessAction = { type: 'LOGIN_SUCCESS', username: string, token: string };
type loginFailureAction = { type: 'LOGIN_FAILURE', error: authErrorType};
type logoutAction = { type: 'LOGOUT' };

type authActions =
  | loginSuccessAction
  | loginFailureAction
  | logoutAction
  | { type: $Subtype<string> };

const initialState = {
  username: null,
  token: null,
  error: {},
  loggedIn: false
};

function loginReducer(state: loginStateType = initialState, action: authActions) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.username,
        token: action.token,
        loggedIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        loggedIn: false
      };
    case LOGOUT:
      return {
        ...state,
        username: null,
        token: null,
        loggedIn: false
      };
    default:
      return state;
  }
}

export default loginReducer;
