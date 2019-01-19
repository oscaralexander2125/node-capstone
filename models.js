'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const healthTrackSchema = mongoose.Schema({
  weight: {type: String, required: true}
});

healthTrackSchema.methods.serialize = function() {
  return {
    id: this._id,
    weight: this.weight
  };
};

const HealthTracker = mongoose.model('tracker', healthTrackSchema);

module.exports = {HealthTracker};