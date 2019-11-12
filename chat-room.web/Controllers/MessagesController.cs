using System.Threading.Tasks;
using chat_room.web.Controllers.Extensions;
using chat_room.web.Controllers.Models;
using chat_room.web.Data;
using chat_room.web.Data.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace chat_room.web.Controllers
{
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ChatRoomContext _db;

        public MessagesController(ChatRoomContext context)
        {
            _db = context;
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
            var entity = await _db.Messages.AddAsync(body.ToMessage());
            await _db.SaveChangesAsync();
            return entity.Entity.ToMessage();
        }
    }
}