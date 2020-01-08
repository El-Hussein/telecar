import {
  Fetch_Chat_IN_Room_Attemp,
  Fetch_Chat_IN_Room_Success,
  Fetch_CHat_IN_Room_fail,
  Reset_CHat_IN_Room,
  Fetch_Chat_Rooms_Attemp,
  Fetch_Chat_Rooms_Success,
  Fetch_CHat_Rooms_fail,
  Reset_CHat_Rooms,
  Fetch_Order_detail_Attemp,
  Fetch_Order_detail_Success,
  Fetch_Order_detail_Fail
} from "../types";

const initialState = {
  chatRoom: {
    loading: false,
    data: [],
    order: {
      // loading: false,
      // data: null
    },
    page: 1,
    isEnd: false
  },
  Rooms: {
    loading: false,
    data: [],
    page: 1,
    isEnd: false
  }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case Fetch_Chat_IN_Room_Attemp: {
      return {
        ...state,
        chatRoom: { ...state.chatRoom, loading: action.payload, isEnd: false }
      };
    }
    case Fetch_Chat_IN_Room_Success: {
      const { page, data, order, isSocket } = action.payload;
      let newChatData =
        page === 1 && !isSocket
          ? data
          : isSocket
          ? [...data, ...state.chatRoom.data]
          : [...state.chatRoom.data, ...data];
      let neworder = page === 1 && !isSocket ? order : state.chatRoom.order;
      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          loading: false,
          data: newChatData,
          page: page + 1,
          order: neworder
        }
      };
    }
    case Fetch_CHat_IN_Room_fail: {
      const { isEnd } = action.payload;
      return {
        ...state,
        chatRoom: { ...state.chatRoom, isEnd, loading: false }
      };
    }
    case Reset_CHat_IN_Room: {
      return { ...state, chatRoom: initialState.chatRoom };
    }
    ////////////////////////////
    case Fetch_Chat_Rooms_Attemp: {
      return {
        ...state,
        Rooms: { ...state.Rooms, loading: true, isEnd: false }
      };
    }
    case Fetch_Chat_Rooms_Success: {
      const { page, data } = action.payload;
      let newChatData = page === 1 ? data : [...state.Rooms.data, ...data];
      return {
        ...state,
        Rooms: {
          ...state.Rooms,
          loading: false,
          data: newChatData,
          page: page + 1
        }
      };
    }
    case Fetch_CHat_Rooms_fail: {
      const { isEnd } = action.payload;
      return {
        ...state,
        Rooms: { ...state.Rooms, isEnd, loading: false }
      };
    }
    case Reset_CHat_Rooms: {
      return { ...state, Rooms: initialState.Rooms };
    }
    case Fetch_Order_detail_Attemp: {
      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          order: { ...state.chatRoom.order, loading: true }
        }
      };
    }
    case Fetch_Order_detail_Success: {
      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          order: { data: action.payload, loading: false }
        }
      };
    }
    case Fetch_Order_detail_Fail: {
      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          order: { ...state.chatRoom.order, loading: false }
        }
      };
    }
    default:
      return state;
  }
};
