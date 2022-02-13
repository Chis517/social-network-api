const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
      trim: true
    },
    thoughts: [
      {
        type: Schema.Types.objectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.objectId,
        ref: 'User'
      }
    ]
  },
  // Allows schema to use virtuals
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Gets total count of Friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;