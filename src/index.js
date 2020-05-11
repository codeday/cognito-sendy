/* eslint-disable no-console */
const app = require('express')();
const bodyParser = require('body-parser');
const { dereferenceDottedString } = require('./utils');
const subscribe = require('./sendy');

const port = process.env.PORT || 80;
app.use(bodyParser.json());

app.get('/health', (_, res) => res.send('ok'));

app.post('/', (req, res) => {
  const { list, ...query } = req.query;

  const sendyData = Object.keys(query)
    .reduce((accum, k) => ({
      ...accum,
      [k]: dereferenceDottedString(query[k], req.body),
    }), {});

  try {
    subscribe({
      ...sendyData,
      list,
    });
    res.send('ok');
  } catch (err) {
    console.error(err);
    res.send('error');
  }
});

app.listen(port, () => console.log(`Listening at http://0.0.0.0:${port}/`));
