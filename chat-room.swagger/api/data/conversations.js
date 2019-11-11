var conversations = [
  {
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
  }
];

module.exports = {
  conversations: conversations
};
