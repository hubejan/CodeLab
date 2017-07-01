import { teacherLoginMock, teacherLogoutMock, error } from './async-utils/auth-mocks';

const mockedTeacherLogin = jest.fn(teacherLoginMock);
const mockedTeacherLogout = jest.fn(teacherLogoutMock);

describe('action creators', () => {
  // logout needs to be changed to reflect async auth revoke
  it('should create a LOGOUT action', () => {
    const dispatcherFunc = mockedTeacherLogout();
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    mockGetState.mockReturnValueOnce({ auth: { token: 'a valid token' } })
                .mockReturnValue({ auth: { token: 'invalid token' } });
                // different returns on first and second call to this func

    return dispatcherFunc(mockDispatch, mockGetState)
    .then(() => {
      expect(mockDispatch).toBeCalledWith({ type: 'LOGOUT' });
      expect(mockGetState).toHaveBeenCalled();
      return dispatcherFunc(mockDispatch, mockGetState);
    })
    .then(() => {
      expect(mockDispatch.mock.calls.length).toBe(1);
      expect(mockGetState.mock.calls.length).toBe(2);
      return expect(mockDispatch.mock.calls).toMatchSnapshot();
    });
  });

  it('should create an action with a valid token and username on successful login', () => {
    const dispatcherFunc = mockedTeacherLogin('a valid code');
    const mockDispatch = jest.fn();

    return dispatcherFunc(mockDispatch)
    .then(() => {
      expect(mockDispatch).toBeCalledWith({
        type: 'LOGIN_SUCCESS',
        token: 'a valid access token',
        username: 'Dummy Name'
      });
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
