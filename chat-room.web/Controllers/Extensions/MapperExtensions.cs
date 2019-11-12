using System;
using System.Linq;
using chat_room.web.Data.Models;

namespace chat_room.web.Controllers.Extensions
{
    public static class MapperExtensions
    {
        public static Models.Conversation ToConversation(this Conversation c)
        {
            return new Models.Conversation
            {
                ConversationId = c.ConversationId,
                Users = c.UserConversations.Select(uc => uc.UserId).ToList(),
                Messages = c.Messages.Select(m => m.ToMessage()).ToList(),
            };
        }
        
        public static Models.User ToUser(this User u)
        {
            return new Models.User
            {
                UserId = u.UserId,
                Username = u.Username,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Phone = u.Phone,
                Age = u.Age,
                Blood = u.Blood,
                IsDoctor = u.IsDoctor
            };
        }
        
        public static Models.Message ToMessage(this Message m)
        {
            return new Models.Message
            {
                MessageId = m.MessageId,
                UserId = m.UserId,
                Content =  m.Content,
                SentDate = new DateTime(),
                ConversationId = m.ConversationId
            };
        }
    }
}