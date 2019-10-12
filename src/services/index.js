// import login from './login';
// import order from './order';
// import goods from './goods';
// import system from './system';
// import devices from './device';
// import content from './content';

// export default {
//   ...login,
//   ...order,
//   ...goods,
//   ...system,
//   ...devices,
//   ...content,
// };

const context = require.context('./', false, /\.js$/);
const obj = {};
context.keys().filter(item => item !== './index.js').forEach((key) => {
  Object.keys(context(key).default).forEach((method) => {
    if (obj[method]) throw new Error(`请求方法 ${method} 命名有冲突`);
    obj[method] = context(key).default[method];
  });
});
export default obj;
