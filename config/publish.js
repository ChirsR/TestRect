/**
 * 发布配置
 */

const path = require('path');

module.exports = {
  // 开发环境
  dev: {
    host: '10.45.47.161',
    port: '22',
    user: 'root',
    pass: 'root123456',
    remotePath: '/root/web/NewRetail/collectmoney',
  },
  // 测试环境
  test: {
    host: '175.6.136.234',
    port: '22',
    user: 'root',
    pass: '7%H213^g486',
    remotePath: '/root/web/collectmoney',
  },
  // 生产环境
  prod: {
    host: '175.6.136.223',
    port: '22',
    user: 'root',
    pass: '7%H213^g486',
    remotePath: '/root/web/collectmoney',
  },
};
