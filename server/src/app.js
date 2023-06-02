require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const countriesRouter = require('./routes/getCountries');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello, welcome to the server for the W3 IT Solutions challenge.',
  });
});

app.use('/countries', countriesRouter);

app.use((err, req, res, next) => {
  const error = new Error('Not Found');
  console.error(err.stack);
  error.status(500).send('Oops, we have a server error');
  next(error);
});

const server = app.listen(PORT, () => {
  console.info(
    `The server is successfully started on port ${PORT}. You can see it here: http://localhost:3000/`
  );
});

module.exports = server;
