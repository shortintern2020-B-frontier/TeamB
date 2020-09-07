import {
  CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE,
  OPEN_ROOM_DIALOG, CLOSE_ROOM_DIALOG,
} from '../actions/createRoomAction';

const initialState = {
  isLoading: false,
  is_opened: false,
};

// TODO: 実際のapiを組み込むときに変更する
// json_serverだと、tokenの値はaccess_tokenでアクセス出来る
const createRoom = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM_REQUEST:
      return {
        isLoading: true,
        is_opened: true,
      };
    case CREATE_ROOM_SUCCESS:
      return {
        isLoading: false,
        is_opened: false,
        lastUpdated: action.receivedAt,
      };
    case CREATE_ROOM_FAILURE:
      return {
        isLoading: false,
        is_opened: false,
        error: action.error,
      };
    case OPEN_ROOM_DIALOG:
      return {
        isLoading: false,
        is_opened: true,
      };
    case CLOSE_ROOM_DIALOG:
      return {
        isLoading: false,
        is_opened: false,
      };
    default:
      return state;
  }
};

export default createRoom;
