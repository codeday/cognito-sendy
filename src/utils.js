module.exports.dereferenceDottedString = (str, obj) => {
  try {
    return str.split('.').reduce((o, i) => o[i], obj);
  } catch (ex) {
    return null;
  }
};
