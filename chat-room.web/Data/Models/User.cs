using System.Collections.Generic;

namespace chat_room.web.Data.Models
{
    public class User
    {
        public int UserId { get; set; }
        
        public string Name { get; set; }
        
        public bool IsDoctor { get; set; }
        
        public List<UserConversation> UserConversations { get; } = new List<UserConversation>();
    }
    
    public class UserConversation
    {
        public int UserId { get; set; }
        public User User { get; set; }
        
        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
    }

    public class Conversation
    {
        public int ConversationId { get; set; }
        
        public List<Message> Messages { get; } = new List<Message>();
        
        public List<UserConversation> UserConversations { get; } = new List<UserConversation>();
    }

    public class Message
    {
        public int MessageId { get; set; }

        public string Content { get; set; }

        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}