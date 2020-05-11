const FormData = require('form-data');

module.exports = (data) => {
  const form = new FormData();
  Object.keys(data).forEach((k) => form.append(k, data[k]));
  form.submit('https://email.srnd.org/subscribe');
};
