const { User } = require('../models');

const userController = {
  // get all Users
  getAllUser(req, res) {
    User.find({})
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get a User by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID!' });
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // Create a User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // update User by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this ID!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete User by ID
  deleteUser({ params }, res) {
    User.findByIdAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this ID!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // Add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true })
      .populate({ path: 'friends', select: ('-__v') })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this ID!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // Delete a friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: 'friend', select: '-__v'})
    .select('-__v')
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({ message: 'No user with this particular Id!'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;