import * as actions from '../../../app/actions/auth-actions';

export const error = {
  error: 'bad validation',
  error_description: 'incorrect code',
  error_uri: '/error'
};

const validAuthInfo = {
  client_id: 'a valid id',
  client_secret: 'a valid secret',
  code: 'a valid code'
};

const validBasicAuth = {
  username: validAuthInfo.client_id,
  password: validAuthInfo.client_secret,
  token: 'a valid token'
};

const authorizeAppMock = (authInfo) => new Promise((resolve, reject) => {
  // defer execution of function until next event loop iteration
  process.nextTick(
    () => (
      validAuthInfo.client_id === authInfo.client_id &&
      validAuthInfo.client_secret === authInfo.client_secret &&
      validAuthInfo.code === authInfo.code
      ? resolve({ access_token: 'a valid access token' })
      : reject(error))
  );
});

export const teacherLoginMock = (authCode: string) => (dispatch: *) => {
  const authInfo = {
    client_id: 'a valid id',
    client_secret: 'a valid secret',
    code: authCode
  };

  return authorizeAppMock(authInfo)
    .then(response =>
      dispatch({
        type: actions.LOGIN_SUCCESS,
        token: response.access_token,
        username: 'Dummy Name'
      })
    )
    .catch(authError =>
      dispatch({ type: actions.LOGIN_FAILURE, error: authError })
    );
};

const revokeAuthMock = (token: string) => new Promise((resolve, reject) => {
  process.nextTick(
    () => (
      validBasicAuth.token === token &&
      validBasicAuth.username === 'a valid id' &&
      validBasicAuth.password === 'a valid secret'
      ? resolve('successfully revoked auth for this app')
      : reject('permissions not revoked'))
  );
});

export const teacherLogoutMock = () => (dispatch: *, getState: *) => {
  const token = getState().auth.token;
  return revokeAuthMock(token)
    .then(() =>
      dispatch({ type: actions.LOGOUT })
    )
    .catch(errorMsg => errorMsg);
};
