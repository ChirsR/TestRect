import {
  LOGIN_SUCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCESS,
  USER_INFO_FAILURE,
  USER_UNLOGIN,
} from './types';
import api from '$services/index';
import { setCookie } from '$src/utils/cookie';
import history from '$src/routes/history';
import getSearchObj from '$src/utils/getSearchObj';

const userActions = dispatch => ({
  login: (username, password) => api.login({ username, password })
    .then((res) => {
      setCookie('token', res.token, 'h1'); // 把tocken 放入cookie 1小时
      setCookie('userId', res.adminUser.userid, 'h1'); // 把userid 放入cookie 1小时
      setCookie('userSessionId', res.userMenu.userSessionId, 'h1'); // 保存 userSessionId
      dispatch({ type: LOGIN_SUCESS, payload: res });
      const searchObj = getSearchObj();
      const redirect = searchObj.redirect ? searchObj.redirect : '/';
      history.replace(redirect);
    }),

  getInfo: () => {
    dispatch({ type: USER_INFO_REQUEST });
    return api.getUser().then((res) => {
      const isLogin = !!res.loginStatusCode;
      const userInfo = res.adminUser ? res.adminUser : {};
      dispatch({ type: USER_INFO_SUCESS, payload: { isLogin, userInfo, shopInfo: res.shopInfo } });
    }).catch(() => {
      dispatch({ type: USER_INFO_FAILURE });
    });
  },

  setUnLogin: () => {
    dispatch({ type: USER_UNLOGIN });
  },

});

export default userActions;
