'use strict';

var bcrypt = require('bcryptjs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp'),
    Long = require('mongoose-long')(mongoose);

var modelSchema = new Schema({
  name: {
    type: String,
    required: true,
    valiate: /^[a-zA-Z0-9 ]{1,40}$/
  },
  gender: {
    type: String,
    required: true,
    enum: ['M', 'F']
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/
  },
  city: {
    type: String,
    valiate: /^[a-zA-Z0-9 ]{1,40}$/
  },
  state: {
    type: String,
    valiate: /^[A-Z]{2}$/
  },
  accounts: {
    local: {
      username: {
        type: String,
        unique: true,
        valiate: /^[a-zA-Z0-9]{1,30}$/
      },
      password: {
        type: String
      }
    },
    facebook: {
      id: {
        type: Long,
        unique: true
      },
      email: String,
      url: String,
      pictureUrl: String
    }
  }
});

// Instance Methods
modelSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.accounts.local.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

modelSchema.pre('save', function(next) {
  var user = this,
      password;

  if (!user.isModified('accounts.local.password')) {
    return next();
  }

  password = user.accounts.local.password;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      
      user.accounts.local.password = hash;
      next();
    });
  });
});

modelSchema.index({ startDate: 1, finalDate: 1 });
modelSchema.plugin(timestamps);

module.exports = mongoose.model('users', modelSchema);
