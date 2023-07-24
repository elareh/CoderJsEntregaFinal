const User = require('../models/User');

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((error) => {
      res.status(500).send('Error retrieving user: ' + error);
    });
};

exports.createUser = (req, res) => {
  const { username, email, password } = req.body;
  User.create({
    username: username,
    email: email,
    password: password,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(500).send('Error creating user: ' + error);
    });
};