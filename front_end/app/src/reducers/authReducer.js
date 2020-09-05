import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from '../actions/authAction';

const initialState = {
  token: null,
  isLoggedIn: false,
};

const auth = (state = [initialState], action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        token: null,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        token: action.token,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        token: null,
        isLoggedIn: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default auth;