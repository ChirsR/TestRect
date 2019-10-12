import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import intl from 'react-intl-universal';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enGB from 'antd/lib/locale-provider/en_GB';
import { LocaleProvider } from 'antd';
import store from './manage/store';
import routes from '$src/routes';
import history from '$src/routes/history';

import userActions from '$src/manage/actions/userActions';
import { getCookie } from '$src/utils/cookie';
// import registerServiceWorker from './registerServiceWorker';

import langEn from './locales/en-US';
import langZh from './locales/zh-CN';

// locale data
const locales = {
  'en-US': langEn,
  'zh-CN': langZh,
};
const compents = {
  'en-US': enGB,
  'zh-CN': zhCN,
};


const getLocale = () => {
  // 服务器应返回当前请求ip所在区域，并设置在cookie里
  // 优先获取用户选择的语言
  let locale = getCookie('userLocale');
  if (!locale) {
    // 如果用户没有选择语言，获取服务器返回的区域语言
    locale = getCookie('areaLocale');
  }
  if (!locales[locale]) {
    // 不存在cookie 或者 不支持当前语言
    locale = 'zh-CN';
  }
  window.locale = locale;
  return locale;
};

class App extends React.Component {
  state = {
    isReady: false,
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const requireArr = [
      intl.init({
        currentLocale: getLocale(),
        locales,
      })];

    // 是否需要获取用户信息
    // const { isLogin, userRequestStatus } = this.props.user;
    // if (!isLogin && (userRequestStatus === -1 || userRequestStatus === 2)) {
    //   const token = getCookie('token');
    //   if (token) {
    //     requireArr.push(this.props.getInfo());
    //   } else {
    //     this.props.setUnLogin();
    //   }
    // }

    Promise.all(requireArr)
      .then(() => {
        this.setState({ isReady: true });
      })
      .catch((error) => {
        console.log(error);
        document.body.innerHTML =
          '<h3 style="text-align:center;padding:30px;">数据加载失败,请重试</h3>';
      });
  }

  render() {
    return this.state.isReady ? (

      <Router history={history}>{routes}</Router>

    ) : '';
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const CApp = connect(mapStateToProps, userActions)(App);

ReactDOM.render(
  <LocaleProvider locale={compents[getLocale()]}>
    <Provider store={store}>
      <CApp />
    </Provider>
  </LocaleProvider>,
  document.getElementById('root'),
);
// registerServiceWorker();
