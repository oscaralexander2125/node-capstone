require('dotenv').config();//what is this
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(morgan('common'));
app.use(express.json());

const {router: trackerRoute} = require('./daily-health');
const {DATABASE_URL, TEST_DATABASE_URL, PORT} = require('./config');
const {router: userRoute} = require('./users');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
})

const jwtAuth = passport.authenticate('jwt', {session: false});
//where is this needed? idk what its purpose is.

app.use('/api/track', trackerRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRouter);

app.get('/api/check', jwtAuth, (req, res) => {
  res.json({message: 'youre authorized'})
})


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
