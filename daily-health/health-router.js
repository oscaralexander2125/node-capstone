const express = require('express');
const router = express.Router();
const {HealthTracker} = require('./models');
const {User} = require('../users');
const bodyParser = require('body-parser');
const jsonparser = bodyParser.json();
const {jwtStrategy} = require('../auth');
const passport = require('passport');

passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/', jwtAuth, (req, res) => {
  let email = req.user.email;

  User.findOne({email:email})
    .then(user => {
      HealthTracker.find({userId: user._id})
      .sort({date: -1})
      .then(records => {
        res.json(records.map(post => post.serialize()));
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'})
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: "Internal server error"})
    });
});

router.get('/:id', (req, res) => {
  HealthTracker.findById(req.params.id)
    .then(health => res.json(health.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
})

router.post('/', jwtAuth, (req, res) => {
  const requiredFields = ['weight'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \` ${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    };
  };

  let email = req.user.email;

  User.findOne({email:email})
    .then(user => {
      HealthTracker.create({
      weight: req.body.weight,
      caloriesBurned: req.body.caloriesBurned,
      caloriesConsumed: req.body.caloriesConsumed,
      meals: req.body.meals,
      date: req.body.date,
      userId : user._id
      })
      .then(data => res.status(201).json(data.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'})
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'})
    })
});

router.put('/:id', jwtAuth, (req, res) => {
  if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = `Request path id ${req.params.id} and request body id
    ${req.body.id} must match`;
    console.error(message);
    return res.status(400).json({message: message});
  };

  const toUpdate = {};
  const updateFields = ['weight', 'caloriesBurned', 'caloriesConsumed', 'meals'];

  updateFields.forEach(field => {
    if(field in req.body) {
      toUpdate[field] = req.body[field];
    };
  });
  HealthTracker.findByIdAndUpdate(req.body.id, {$set:toUpdate}, {new: true})
    .then(update => {
      res.status(200).json(update);//this return for old values
    })
    .catch(err => {res.status(500).json({message: err})
  });
});

router.delete('/:id', jwtAuth, (req, res) => {
HealthTracker.findByIdAndRemove(req.params.id)
  .then(() => {
    res.status(204).json({message: 'Daily values removed'})
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'})
  });
});

module.exports = {router};