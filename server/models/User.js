const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true, 
    min: 8, 
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
  // posts: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'post'
  // }]
});

module.exports = mongoose.model('user', UserSchema);