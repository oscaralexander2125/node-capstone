'use strict';

const mongoose = require('mongoose');
const {User} = require('../users');

mongoose.Promise = global.Promise;

const healthTrackSchema = mongoose.Schema({
  weight: {type: String, required: true},
  caloriesBurned: {type: String, default: 0},
  caloriesConsumed:{type: String, default: 0},
  meals:{type: Array},
  created: {type: Date, default: Date.now},
  date: {type: Date},//?
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

healthTrackSchema.methods.serialize = function() {
  return {
    id: this._id,
    weight: this.weight,
    caloriesBurned: this.caloriesBurned,
    caloriesConsumed: this.caloriesConsumed,
    meals: this.meals,
    created: this.created,
    date:this.date,
    userId: this.userId
  };
};

const HealthTracker = mongoose.model('health', healthTrackSchema, 'health');

module.exports = {HealthTracker};