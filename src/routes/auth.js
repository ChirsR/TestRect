import React from 'react';
import { Redirect } from 'react-router-dom';
// 鉴权
import store from '../manage/store';
import history from '$src/routes/history';

// 登录鉴权
export const authLogin = () => {
  const storeUser = store.getState().user;
  const { isLogin, userRequestStatus } = storeUser;
  if (!isLogin && (userRequestStatus === 1 || userRequestStatus === 2)) {
    return (
      <Redirect to={{
        pathname: '/login',
        search: history.location.pathname === '/' ? '' : `redirect=${history.location.pathname}`,
        state: { from: history.location.pathname, ...history.location.state },
      }}
      />
    );
  }
  return '';
};

// 页面鉴权
export const authRoute = () => {

};
