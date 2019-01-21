const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.use(express.static('public'));

const trackerRoute = require('./daily-health/health-router')
const {DATABASE_URL, TEST_DATABASE_URL, PORT} = require('./config');
const {router: userRoute} = require('./users');

app.use(express.json());

app.use('/api/track', trackerRoute);
app.use('/api/users', userRoute);

let server;

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
})

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
