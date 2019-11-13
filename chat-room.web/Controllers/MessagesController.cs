using System;
using System.Threading.Tasks;
using chat_room.web.Controllers.Extensions;
using chat_room.web.Controllers.Models;
using chat_room.web.Data;
using chat_room.web.Data.Extensions;
using chat_room.web.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace chat_room.web.Controllers
{
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ChatRoomContext _db;
        private readonly IHubContext<ChatRoomHub> _hub;

        public MessagesController(ChatRoomContext context, IHubContext<ChatRoomHub> hub)
        {
            _db = context;
            _hub = hub;
        }
        
        [HttpPost]
        [Route("/messages")]
        public async Task<ActionResult<Message>> AddMessage([FromBody]Message body)
        {
            var userId = HttpContext.Session.GetInt64("userId");
            if (userId == null)
            {
                return Unauthorized();
            }

            body.UserId = userId.Value;
            body.SentDate = DateTime.Now;
            var entity = await _db.Messages.AddAsync(body.ToMessage());
            await _db.SaveChangesAsync();
            await _hub.Clients.All.SendAsync(
                Methods.SendAll, 
                MessageTypes.Message, 
                entity.Entity.ConversationId);
            return entity.Entity.ToMessage();
        }
    }
}