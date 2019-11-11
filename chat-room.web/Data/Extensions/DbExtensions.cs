using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace chat_room.web.Data.Extensions
{
    public static class DbExtensions
    {
        public static string ConnectionString;
        
        public static void CreateDB(this IApplicationBuilder app, IWebHostEnvironment env, ChatRoomContext db)
        {
            try
            {
                var file = System.IO.Path.Combine(env.WebRootPath, "chat_room.sqlite");
                ConnectionString = $"Data Source={file}";

                DbInitializer.Initialize((db));
            }
            catch (Exception ex)
            {
                throw new Exception($"Cannot create db with connection string = {ConnectionString}", ex);
            }
        }
    }
}