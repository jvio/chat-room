using chat_room.web.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace chat_room.web
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Adding CORS to support spa access from angular development port
            services.AddCors((options) =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:4200"); // ng default dev port
                });
            });
            
            // Adding signalR services
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            // Tels middleware to use CORS policy, before endpoints configuration
            app.UseCors("CorsPolicy");

            // Enables serve static files of ng
            app.UseStaticFiles();
            
            // Displays swagger endpoints
            app.UseSwagger(env);
            
            // Enables routing
            app.UseRouting();

            // Defines endpoints
            app.UseEndpoints(endpoints =>
            {
                // Hello world 
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });
                
                // Adding endpoint for signalR chat room
                endpoints.MapHub<ChatRoomHub>("chat-room");
            });
            
            // Creates db
            app.CreateDB(env);
        }
    }

    public static class SwaggerExtensions
    {
        public static void UseSwagger(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying
            // the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger.json", "chat-room");
            });
        }
    }
}
