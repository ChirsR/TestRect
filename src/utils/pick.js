export default {
  pickProps(obj, props) {
    const newObj = {};
    props.map((val) => {
      if (val in obj && obj[val] !== null && obj[val] !== '') {
        newObj[val] = obj[val];
      }
      return null;
    });
    return newObj;
  },
};
