using chat_room.web.Data;
using chat_room.web.Data.Extensions;
using chat_room.web.Hubs;
using chat_room.web.OpenApi.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
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
            
            // Adding db context
            services.AddDbContext<ChatRoomContext>();
            
            // Adding api
            services.AddControllers();
            
            // Adding cache
            services.AddDistributedMemoryCache();
            
            // Adding session
            services.AddSession();

            // Adding spa static files
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "../chat-room.ng/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ChatRoomContext db)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            // Tels middleware to use CORS policy, before endpoints configuration
            app.UseCors("CorsPolicy");

            // Enables serve static files of ng
            app.UseStaticFiles();

            // Use spa static files in prod
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            // Enables session
            app.UseSession();
            
            // Displays swagger endpoints
            app.UseSwagger(env);
            
            // Enables routing
            app.UseRouting();

            // Defines endpoints
            app.UseEndpoints(endpoints =>
            {
                // Hello world
                endpoints.MapGet("/hello", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });
                
                // Adding endpoint for signalR chat room
                endpoints.MapHub<ChatRoomHub>("chat-room");
                
                // Adding Api
                endpoints.MapControllers();
            });
            
            // Connects angular cli build with net core pipeline
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "../chat-room.ng";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer("start:mvc");
                }
            });
            
            // Creates db
            app.CreateDB(env, db);
        }
    }
}
