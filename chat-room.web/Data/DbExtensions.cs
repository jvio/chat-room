using System;
using System.Linq;
using chat_room.web.Data.Models;
using chat_room.web.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace chat_room.web.Data
{
    public static class DbExtensions
    {
        public static string ConnectionString;
        
        public static void CreateDB(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            try
            {
                var file = System.IO.Path.Combine(env.WebRootPath, "chat_room.sqlite");
                ConnectionString = $"Data Source={file}";

                using (var context = new ChatRoomContext())
                {
                    // Clears and resets the database.
                    context.Database.EnsureDeleted();

                    // Create the database if it does not exist
                    var isCreated = context.Database.EnsureCreated();

                    // If first time, create default users
                    if (isCreated)
                    {
                        var user = new User
                        {
                            Name = "Javier Villarreal"
                        };
                        context.Users.Add(user);
                        context.SaveChanges();

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
                        context.Add(conversation);
                        context.SaveChanges();

                        // Read
                        Console.WriteLine("Querying for a conversation");
                        var lastConversation = context.Conversations
                            .OrderBy(b => b.ConversationId)
                            .Last();

                        // Update
                        Console.WriteLine("Updating the conversation and adding a message");
                        lastConversation.Messages.Add(
                            new Message
                            {
                                Content = "Hello World",
                                User = user
                            });
                        context.SaveChanges();

                        // Delete
                        /*
                        Console.WriteLine("Delete the blog");
                        context.Remove(conversation);
                        context.SaveChanges();
                        */
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Cannot open db with connection string = {ConnectionString}", ex);
            }
        }
    }
}