'use strict';

var util = require('util');

var conversations = require('../data/conversations');

module.exports = {
  getConversations: getConversations,
  getConversationById: getConversationById
};

function getConversations(req, res) {
  res.json(conversations.conversations);
}

function getConversationById(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var id = req.swagger.params.conversationId.value;
  var conversation = conversations.conversations.find(c => c.conversationId === id);
  // this sends back a JSON response which is a single string
  res.json(conversation);
}
