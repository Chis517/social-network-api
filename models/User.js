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
      trim: true
    },
    thoughts: [
      {
        type: Schema.Types.ThoughtId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.UserId,
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

// Gets total count of comments and replies
UserSchema.virtual('friendCount').get(function() {
  return this.friends.reduce((total, friend) => total + user.friends.length + 1, 0);
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;