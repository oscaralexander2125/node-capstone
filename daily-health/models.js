'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const healthTrackSchema = mongoose.Schema({
  weight: {type: String, required: true},
  caloriesBurned: String,
  created: {type: Date, default: Date.now}
});

healthTrackSchema.methods.serialize = function() {
  return {
    id: this._id,
    weight: this.weight,
    caloriesBurned: this.caloriesBurned,
    created: this.created
  };
};

const HealthTracker = mongoose.model('health', healthTrackSchema, 'health');

module.exports = {HealthTracker};