using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace chat_room.web.OpenApi.Extensions
{
    public static class SwaggerExtensions
    {
        public static void UseSwagger(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying
            // the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/openapi.json", "chat-room");
            });
        }
    }
}