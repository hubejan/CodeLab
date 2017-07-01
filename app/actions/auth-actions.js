// @flow
import axios from 'axios';
import gitAuth from '../utils/github.settings';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

type authInfoType = {
  client_id: string,
  client_secret: string,
  code: string
};

const authorizeApp = (authInfo: authInfoType) => {
  const url = 'https://github.com/login/oauth/access_token';
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  };
  return axios.post(url, authInfo, config);
};

const getUsername = (token) => {
  const url = 'https://api.github.com/user';
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: `token ${token}`
    }
  };
  return axios.get(url, config)
    .then(response => response.data.name); // optionally data.login
};

const revokeAuth = (token: string) => {
  const url = `https://api.github.com/applications/${gitAuth.client_id}/grants/${token}`;
  const config = {
    auth: {
      username: gitAuth.client_id,
      password: gitAuth.client_secret
    }
  };
  return axios.delete(url, config);
};

export const storageLogin = (token: string, username: string) => ({
  type: LOGIN_SUCCESS,
  token,
  username
});

export const teacherLogin = (authCode: string) => (dispatch: *) => {
  const authInfo = {
    client_id: gitAuth.client_id,
    client_secret: gitAuth.client_secret,
    code: authCode
  };

  return authorizeApp(authInfo)
    .then(response => {
      if (!response.data.access_token) {
        const error = new Error('failed authorization');
        error.failure = response.data;
        throw error;
      }
      return response.data.access_token;
    })
    .then(token => Promise.all([token, getUsername(token)]))
    .then(([token, username]) => {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      return dispatch({ type: LOGIN_SUCCESS, token, username });
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: LOGIN_FAILURE, error: error.failure });
    });
};

// future: come back and learn how to do dispatch/getState flow types
export const teacherLogout = () => (dispatch: *, getState: *) =>
  revokeAuth(getState().auth.token)
    .then(() => {
      localStorage.clear();
      return dispatch({ type: LOGOUT });
    })
    .catch(error => {
      console.error(error);
    });
