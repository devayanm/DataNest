const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dataFields: [{
    type: String,
  }],
  isSold: {
    type: Boolean,
    default: false,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
