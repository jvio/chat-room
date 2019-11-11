using chat_room.web.Data.Extensions;
using chat_room.web.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace chat_room.web.Data
{
    public class ChatRoomContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        
        public DbSet<Conversation> Conversations { get; set; }
        
        public DbSet<Message> Messages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Specify the path of the database here
            if (DbExtensions.ConnectionString != null)
            {
                optionsBuilder.UseSqlite(DbExtensions.ConnectionString);
            }
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Defining many to many relationship for conversations and users using fluent api
            modelBuilder.Entity<UserConversation>()
                .HasKey(bc => new { bc.UserId, bc.ConversationId });  
            modelBuilder.Entity<UserConversation>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.UserConversations)
                .HasForeignKey(bc => bc.UserId);  
            modelBuilder.Entity<UserConversation>()
                .HasOne(bc => bc.Conversation)
                .WithMany(c => c.UserConversations)
                .HasForeignKey(bc => bc.ConversationId);
        }
    }
}