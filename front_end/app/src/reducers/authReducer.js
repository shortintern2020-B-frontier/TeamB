import {
  RELOAD_REQUEST, RELOAD_SUCCESS, RELOAD_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from '../actions/authAction';

const initialState = {
  token: null,
  isLoggedIn: false,
  isLoading: true,
};

// TODO: 実際のapiを組み込むときに変更する
// json_serverだと、tokenの値はaccess_tokenでアクセス出来る
const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        token: null,
        isLoggedIn: false,
        isLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        token: action.token,
        isLoggedIn: true,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case SIGNUP_FAILURE:
      return {
        token: null,
        isLoggedIn: false,
        isLoading: false,
        signup_error: action.error,
      };
    case LOGIN_REQUEST:
      return {
        token: null,
        isLoggedIn: false,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        token: action.token,
        isLoggedIn: true,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case LOGIN_FAILURE:
      return {
        token: null,
        isLoggedIn: false,
        isLoading: false,
        login_error: action.error,
      };
    case RELOAD_REQUEST:
      return {
        token: null,
        isLoggedIn: false,
        isLoading: true,
      };
    case RELOAD_SUCCESS:
      return {
        token: action.token,
        isLoggedIn: true,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case RELOAD_FAILURE:
      return {
        token: null,
        isLoggedIn: false,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default auth;
