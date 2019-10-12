import {
  LOGIN_SUCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCESS,
  USER_INFO_FAILURE,
  USER_UNLOGIN,
} from '../actions/types';

const initialState = {
  isLogin: true,
  userRequestStatus: -1, // 请求状态， -1:未请求，0:请求中 1:已请求 2:请求失败
  userInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCESS:
      return {
        ...state,
        isLogin: true,
        userInfo: action.payload.adminUser,
        shopInfo: action.payload.shopInfo,
      };

    case USER_INFO_SUCESS: {
      return {
        ...state,
        userRequestStatus: 1,
        userInfo: action.payload.userInfo,
        isLogin: action.payload.isLogin,
        shopInfo: action.payload.shopInfo,
      };
    }

    case USER_INFO_FAILURE: {
      return {
        ...state,
        userRequestStatus: 2,
      };
    }

    case USER_UNLOGIN: {
      return {
        ...state,
        userRequestStatus: 1,
        isLogin: false,
      };
    }

    default:
      return state;
  }
};
