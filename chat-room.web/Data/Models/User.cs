using System;
using System.Collections.Generic;

namespace chat_room.web.Data.Models
{
    public class User
    {
        public long UserId { get; set; }
        
        public string Username { get; set; }
        
        public string Password { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        
        public string Email { get; set; }
        
        public string Phone { get; set; }
        
        public int Age { get; set; }
        
        public string Blood { get; set; }
        
        public bool IsDoctor { get; set; }
        
        public List<UserConversation> UserConversations { get; } = new List<UserConversation>();
    }
    
    public class UserConversation
    {
        public long UserId { get; set; }
        public User User { get; set; }
        
        public long ConversationId { get; set; }
        public Conversation Conversation { get; set; }
    }

    public class Conversation
    {
        public long ConversationId { get; set; }
        
        public List<Message> Messages { get; } = new List<Message>();
        
        public List<UserConversation> UserConversations { get; } = new List<UserConversation>();
    }

    public class Message
    {
        public long MessageId { get; set; }

        public string Content { get; set; }
        
        public DateTime SentDate { get; set; }

        public long ConversationId { get; set; }
        public Conversation Conversation { get; set; }

        public long UserId { get; set; }
        public User User { get; set; }
    }
}