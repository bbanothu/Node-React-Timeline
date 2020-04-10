
import axios from 'axios';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const GET_USER = "GET_USER";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};


const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  };
};

const registerError = () => {
  return {
    type: REGISTER_FAILURE
  };
};


const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};


export var loginUser = (myEmail, myPassword) => dispatch => {
  dispatch(requestLogin());

  axios.post(`http://localhost:3000/api/loginUser`, { email: myEmail, password: myPassword })
    .then((user => {
      dispatch(receiveLogin(user));
      window.localStorage.setItem('email', myEmail);
      window.localStorage.setItem('password', myPassword);
    }))
    .catch(error => {
      dispatch(loginError());
    })
  console.log(window.localStorage.getItem('passwrd'))
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  dispatch(receiveLogout());
  window.localStorage.removeItem('email');
  window.localStorage.removeItem('password');
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  dispatch(verifySuccess());
  axios.post(`http://localhost:3000/api/loginUser`, { email: window.localStorage.getItem('email'), password: window.localStorage.getItem('password') })
    .then((user => {
      if (user !== null) {
        dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess());
    }
    ))

};
export const registerUser = (myUsername, myEmail, myPassword, myPasswordConf) => dispatch => {
  dispatch(requestLogin());
  const returnVal = axios.post(`http://localhost:3000/api/createUser`,
    { username: myUsername, email: myEmail, password: myPassword, passwordConf: myPasswordConf, })
    .then((user => {
      dispatch(registerSuccess());
    }))
    .catch(error => {
      dispatch(registerError());
    })
};

