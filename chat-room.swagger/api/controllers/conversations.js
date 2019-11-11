'use strict';

var util = require('util');

var conversations = require('../data/conversations');

module.exports = {
  getConversations: getConversations
};

function getConversations(req, res) {
  res.json(conversations.conversations);
}
