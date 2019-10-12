import React from 'react';
import renderRouter from './renderRouter';
import routerConfig from './config';
// import store from '../manage/store';
// import AuthRoute from '$page/component/AuthRoute';
import { authLogin } from './auth';


const routes = renderRouter(routerConfig, '/', {
  beforeEnter: (props, routeItem, component) => {
    if (routeItem.requireAuth !== false) {
      return authLogin();
    }
    return '';
  },
});

export default routes;
