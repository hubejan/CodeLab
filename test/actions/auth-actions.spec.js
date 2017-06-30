import * as actions from '../../app/actions/auth-actions';

const validAuthInfo = {
  client_id: 'a valid id',
  client_secret: 'a valid secret',
  code: 'a valid code'
};

const error = {
  error: 'bad validation',
  error_description: 'incorrect code',
  error_uri: '/error'
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

const teacherLoginMock = (authCode: string) => (dispatch: *) => {
  const authInfo = {
    client_id: 'a valid id',
    client_secret: 'a valid secret',
    code: authCode
  };

  return authorizeAppMock(authInfo)
    .then(response =>
      dispatch({ type: actions.LOGIN_SUCCESS, token: response.access_token })
    )
    .catch(authError =>
      dispatch({ type: actions.LOGIN_FAILURE, error: authError })
    );
};

const mockedTeacherLogin = jest.fn(teacherLoginMock);
describe('action creators', () => {
  // logout needs to be changed to reflect async auth revoke
  xit('should create a LOGOUT action', () => {
    expect(actions.logout()).toMatchSnapshot();
  });

  it('should create an action with a valid token on successful login', () => {
    const dispatcherFunc = mockedTeacherLogin('a valid code');
    const mockDispatch = jest.fn();
    return dispatcherFunc(mockDispatch)
    .then(() => {
      expect(mockDispatch).toBeCalledWith({ type: 'LOGIN_SUCCESS', token: 'a valid access token' });
      return expect(mockDispatch.mock.calls).toMatchSnapshot();
    });
  });

  it('should create an action with an error object on failed login', () => {
    const dispatcherFunc = mockedTeacherLogin('INVALID CODE');
    const mockDispatch = jest.fn();
    return dispatcherFunc(mockDispatch)
    .then(() => {
      expect(mockDispatch).toBeCalledWith({ type: 'LOGIN_FAILURE', error });
      return expect(mockDispatch.mock.calls).toMatchSnapshot();
    });
  });
});
