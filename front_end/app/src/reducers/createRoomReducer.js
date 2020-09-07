import {
  CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE,
} from '../actions/createRoomAction';

const initialState = {
  isLoading: false,
  name: '',
  youtube_id: '',
  is_private: false,
  start_time: '2019/8/1 12:00:00',
};

// TODO: 実際のapiを組み込むときに変更する
// json_serverだと、tokenの値はaccess_tokenでアクセス出来る
const createRoom = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM_REQUEST:
      return {
        isLoading: true,
        name: '',
        youtube_id: '',
        is_private: false,
        start_time: '2019/8/1 12:00:00',
      };
    case CREATE_ROOM_SUCCESS:
      return {
        isLoading: false,
        name: action.name,
        youtube_id: action.youtube_id,
        is_private: action.is_private,
        start_time: action.start_time,
        lastUpdated: action.receivedAt,
      };
    case CREATE_ROOM_FAILURE:
      return {
        isLoading: false,
        name: '',
        youtube_id: '',
        is_private: false,
        start_time: '2019/8/1 12:00:00',
        error: action.error,
      };
    default:
      return state;
  }
};

export default createRoom;
