const { Schema, model } = require('mongoose');

const required = true;

const UserSchema = new Schema({
  email: { required, type: String },
  name: { required, type: String },
  created_at: { required, type: Date, default: Date.now },
  updated_at: { required, type: Date, default: Date.now },
  is_admin: { type: Boolean },
});

UserSchema.index({
  email: 'text',
  name: 'text',
});

module.exports = model('User', UserSchema, 'users');
