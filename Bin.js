const mongoose = require('mongoose');

const BinSchema = mongoose.Schema({
  lat: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  long: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Bins', BinSchema);
