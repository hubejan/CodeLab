import authReducer from '../../app/reducers/auth-reducer';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../../app/actions/auth-actions';

describe('auth reducer', () => {
  const loggedOutState = {
    token: null,
    error: {},
    loggedIn: false
  };

  const loggedInState = {
    token: 'anAccessToken',
    error: {},
    loggedIn: true,
    username: 'Test Name'
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle LOGIN_SUCCESS', () => {
    const successAction = { type: LOGIN_SUCCESS, token: 'anAccessToken', username: 'Test Name' };
    expect(authReducer(loggedOutState, successAction)).toMatchSnapshot();
  });

  it('should handle LOGIN_FAILURE', () => {
    const error = { error: 'bad validation', error_description: 'incorrect code', error_uri: '/error' };
    const failureAction = { type: LOGIN_FAILURE, error };
    expect(authReducer(loggedOutState, failureAction)).toMatchSnapshot();
  });

  it('should handle LOGOUT', () => {
    expect(authReducer(loggedInState, { type: LOGOUT })).toMatchSnapshot();
  });
});
