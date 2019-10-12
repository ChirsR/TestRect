
const context = require.context('./', false, /\.js$/);
const obj = [];
context.keys().filter(item => item !== './index.js').forEach((key) => {
  context(key).default.forEach((item) => {
    obj.push(item);
  });
});
export default obj;
