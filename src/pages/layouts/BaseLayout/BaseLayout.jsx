import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Layout,
  Breadcrumb,
} from 'antd';
import Menu from '$page/component/Menu';
import style from './BaseLayout.less';
import getRegionAction from '$src/manage/actions/regionActions';

const { Header, Content, Sider } = Layout;

class BaseLayout extends Component {
  state = {
    menuName: '',
    smenuName: '',
  }

  componentDidMount() {
    if (!this.props.region) {
      this.props.getRegionAction();
    }
  }

  handleMenuSelect = (menuName, subItem) => {
    this.setState({
      menuName,
      smenuName: subItem.itemName,
    });
  }

  render() {
    const { userInfo } = this.props.user;
    return (
      <Layout>
        <Header className={style.header}>
          <div className={style.logoGroup}>
            <div className={style.logo}>
              <img src="./images/logo-ChinaTelecom.png" alt="中国电信" />
            </div>
            <div className={style.logo}>
              <img src="./images/logo-portal.png" alt="云货架运营管理平台" />
            </div>
          </div>
          <div className={style.userInfo}>
            <div className={style.userAvatar}>
              <img src="./images/avatar-def-man.png" alt="李莎莎" />
            </div>
            <div className={style.userMain}>
              <div className={style.userTit}>{userInfo.username}</div>
              <div className={style.userCout}>{userInfo.userid}</div>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className={style.sider}>
            <Menu onSelect={this.handleMenuSelect} />
          </Sider>
          <Layout>
            <Breadcrumb className={style.breadcrumb}>
              <Breadcrumb.Item className={style.title}>当前位置：</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.menuName}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.smenuName}</Breadcrumb.Item>
            </Breadcrumb>
            <Content className={style.content}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  region: state.region,
});


export default connect(mapStateToProps, { getRegionAction })(BaseLayout);
