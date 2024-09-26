const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dataSold: {
    type: Number,
    default: 0,
  },
  ratings: [{
    rating: { type: Number, required: true },
    comment: { type: String },
    ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
}, { timestamps: true });

userSchema.plugin(encrypt, {
  secret: process.env.DATA_ENCRYPTION_KEY,
  encryptedFields: ["password"], 
});

const User = mongoose.model('User', userSchema);

module.exports = User; 
