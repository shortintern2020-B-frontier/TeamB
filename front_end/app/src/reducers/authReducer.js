import {
  RELOAD_REQUEST, RELOAD_SUCCESS, RELOAD_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from '../actions/authAction';

const initialState = {
  token: null,
  isLoggedIn: false,
  isLoading: true,
};

// TODO: 実際のapiを組み込むときに変更する
// TODO: RELOAD_SUCCESSとRELOQAD_FAILUREに対応させる
// json_serverだと、tokenの値はaccess_tokenでアクセス出来る
const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        token: null,
        isLoggedIn: false,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        token: action.token.access_token,
        isLoggedIn: true,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case LOGIN_FAILURE:
      return {
        token: null,
        isLoggedIn: false,
        isLoading: false,
        error: action.error,
      };
    case RELOAD_REQUEST:
      return {
        token: null,
        isLoggedIn: false,
        isLoading: true,
      }
    case RELOAD_SUCCESS:
      return {
        token: action.token,
        isLoggedIn: true,
        isLoading: false,
        lastUpdated: action.receivedAt,
      }
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