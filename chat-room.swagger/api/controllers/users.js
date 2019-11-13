'use strict';

var util = require('util');

var users = require('../data/users');

module.exports = {
  getUsers: getUsers,
  loginUser: loginUser,
  logoutUser: logoutUser,
  getUserByName: getUserByName
};

function getUsers(req, res) {
  res.json(users.users);
}

function getUserByName(req, res) {
  res.json(users.users[0]);
}

function loginUser(req, res) {
  res.json({});
}

function logoutUser(req, res) {
  res.json({});
}
