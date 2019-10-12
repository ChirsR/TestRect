import intl from 'react-intl-universal';
import { message } from 'antd';
import { getCookie } from './cookie';
import history from '$src/routes/history';

function request(url, params, type) {
  let newUrl = url;
  let options = {
    method: type,
    headers: {
      'content-type': 'application/json',
      token: getCookie('token'), // 头部统一加tocken
    },
  };
  if (type === 'post' || type === 'put' || type === 'delete') {
    options = Object.assign(options, {
      body: JSON.stringify(params),
    });
  }
  if (type === 'get') {
    let queryStr = '';
    if (params) {
      queryStr = '?';
      Object.keys(params).forEach((key) => {
        queryStr += `${key}=${params[key]}&`;
      });
      newUrl = (newUrl + queryStr).slice(0, (newUrl + queryStr).length - 1);
    }
  }

  // fetch本身不支持设置请求超时时间
  // 通过Promise.race()比较两个Promise谁先改变状态来达到请求超时的效果
  return Promise.race([
    window.fetch(newUrl, options).then((res) => {
      if (res.ok) {
        return res;
      }
      return Promise.reject(`${res.status}(${res.statusText})`); // eslint-disable-line
    }).catch(error => Promise.reject(String(error))),
    new Promise(((resolve, reject) => {
      setTimeout(() => {
        reject(intl.get('REQUEST_TIMEOUT'));
      }, 20000);
    }))])
    .then(response => response.json())
    .then((data) => {
      if (Number(data.resultCode) === 0) {
        return data.resultData;
      }
      if (Number(data.resultCode) === 100) {
        const errMsg = '登录超时，请重新登录';
        history.push({
          pathname: '/login',
          search: history.location.pathname === '/' ? '' : `redirect=${history.location.pathname}`,
          state: { from: history.location.pathname, ...history.location.state },
        });
        return Promise.reject(errMsg);
      }

      return Promise.reject(data.resultMsg);
    }).catch((error) => {
      message.error(error);
      return Promise.reject(error);
    });
}

const methods = ['get', 'post', 'put', 'delete'];

const Fetch = {};

methods.forEach((n) => {
  Fetch[n] = (url, params) => request(url, params, n);
});

export default Fetch;
