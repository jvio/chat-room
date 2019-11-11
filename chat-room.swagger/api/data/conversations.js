var conversations = [
  {
    conversationId: 1,
    users: [1, 2],
    messages: [
      {
        messageId: 1,
        userId: 1,
        content: 'Hello there!',
        sentDate: new Date(2019, 11, 1, 5, 5)
      },
      {
        messageId: 2,
        userId: 2,
        content: 'Hello!',
        sentDate: new Date(2019, 11, 1, 5, 30)
      }
    ]
  },
  {
    conversationId: 2,
    users: [1, 2],
    messages: [
      {
        messageId: 1,
        userId: 1,
        content: 'Hey I need your help',
        sentDate: new Date(2019, 11, 1, 5, 5)
      },
      {
        messageId: 2,
        userId: 2,
        content: 'Are you there?',
        sentDate: new Date(2019, 11, 1, 5, 30)
      }
    ]
  }
];

module.exports = {
  conversations: conversations
};
