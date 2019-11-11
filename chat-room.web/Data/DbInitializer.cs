using System;
using System.Linq;
using chat_room.web.Data.Encription;
using chat_room.web.Data.Models;

namespace chat_room.web.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ChatRoomContext db)
        {
            // Clears and resets the database.
            db.Database.EnsureDeleted();

            // Create the database if it does not exist
            var isCreated = db.Database.EnsureCreated();

            // If first time, create default users
            if (isCreated)
            {
                var user = new User
                {
                    Username = "jvio",
                    Password = "javier".Encrypt(),
                    FirstName = "Javier",
                    LastName = "Villarreal",
                    IsDoctor = true
                };
                db.Users.Add(user);
                db.SaveChanges();

                // Create
                Console.WriteLine("Inserting a new conversation");
                var conversation = new Conversation();
                conversation.UserConversations.Add(
                    new UserConversation
                    {
                        Conversation = conversation,
                        User = user
                    }
                );
                db.Add(conversation);
                db.SaveChanges();

                // Read
                Console.WriteLine("Querying for a conversation");
                var lastConversation = db.Conversations
                    .OrderBy(b => b.ConversationId)
                    .Last();

                // Update
                Console.WriteLine("Updating the conversation and adding a message");
                lastConversation.Messages.Add(
                    new Message
                    {
                        Content = "Hello World",
                        SentDate = DateTime.Now,
                        User = user
                    });
                db.SaveChanges();

                // Delete
                /*
                Console.WriteLine("Delete the blog");
                context.Remove(conversation);
                context.SaveChanges();
                */
            }
        }

        public static string Encrypt(this string message)
        {
            var encrypted = AESGCM.SimpleEncrypt(message, GetKey());
            return encrypted;
        }

        public static string Decrypt(this string message)
        {
            var decrypted = AESGCM.SimpleDecrypt(message, GetKey());
            return decrypted;
        }

        private static byte[] GetKey()
        {
            var key256 = new byte[32];
            for (var i = 0; i < 32; i++)
            {
                key256[i] = Convert.ToByte(i % 256);
            }
            return key256;
        }
    }
}