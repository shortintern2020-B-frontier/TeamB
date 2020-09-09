import {
  RELOAD_REQUEST, RELOAD_SUCCESS, RELOAD_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, // Hiranuma
} from '../actions/authAction';

const initialState = {
  token: null,
  id: null,
  isLoggedIn: false,
  isLoading: true,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        token: action.token,
        id: action.id,
        isLoggedIn: true,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case SIGNUP_FAILURE:
      return {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: false,
        signup_error: action.error,
      };
    case LOGIN_REQUEST:
      return {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        token: action.token,
        id: action.id,
        isLoggedIn: true,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case LOGIN_FAILURE:
      return {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: false,
        login_error: action.error,
      };
    case RELOAD_REQUEST:
      return {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: true,
      };
    case RELOAD_SUCCESS:
      return {
        token: action.token,
        id: action.id,
        isLoggedIn: true,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case RELOAD_FAILURE:
      return {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: false,
        error: action.error,
      };
      //Hiranuma
    case LOGOUT_REQUEST:
      return initialState
    default:
      return state;
  }
};

export default auth;
