'use strict';

var util = require('util');

var users = require('../data/users');

module.exports = {
  getUsers: getUsers
};

function getUsers(req, res) {
  res.json(users.users);
}
