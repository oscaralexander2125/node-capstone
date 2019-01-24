const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {HealthTracker} = require('./models');
const bodyParser = require('body-parser');
const jsonparser = bodyParser.json();


router.get('/', (req, res) => {
  HealthTracker.find()
    .then(records => {
      res.json(records.map(post => post.serialize()));
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

router.post('/', jsonparser, (req, res) => {
  //console.log(req.body);
  const requiredFields = ['weight'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \` ${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    };
  };

  HealthTracker.create({
    weight: req.body.weight,
    caloriesBurned: req.body.caloriesBurned,
    caloriesConsumed: req.body.caloriesConsumed,
    meals: req.body.meals
  })
  .then(data => res.status(201).json(data.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'})
  })
});

router.put('/:id', (req, res) => {
  if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = `Request path id ${req.params.id} and request body id
    ${req.body.id} must match`;
    console.error(message);
    return res.status(400).json({message: message});
  };

  const toUpdate = {};
  const updateFields = ['weight', 'caloriesBurned'];

  updateFields.forEach(field => {
    if(field in req.body) {
      toUpdate[field] = req.body[field];
    };
  });
  HealthTracker.findByIdAndUpdate(req.body.id, {$set:toUpdate})
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {res.status(500).json({message: 'Internal server error'})
  });
});

router.delete('/:id', (req, res) => {
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