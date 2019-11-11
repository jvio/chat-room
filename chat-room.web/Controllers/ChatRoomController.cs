using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using chat_room.web.Controllers.Extensions;
using chat_room.web.Controllers.Models;
using chat_room.web.Data;
using chat_room.web.Data.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace chat_room.web.Controllers
{
    [ApiController]
    public class ChatRoomController : ControllerBase
    {
        private readonly ChatRoomContext _db;

        public ChatRoomController(ChatRoomContext context)
        {
            _db = context;
        }
        
        [HttpGet]
        [Route("/conversations")]
        public async Task<ActionResult<IEnumerable<Conversation>>> GetConversations()
        {
            var userIdStr = HttpContext.Session.GetString("userId");
            
            if (userIdStr == null)
            {
                return NotFound();
            }
            
            var userId = Convert.ToInt64(userIdStr);
            
            return await _db.Conversations
                .Include(c => c.Messages)
                .Include(c => c.UserConversations)
                .Where(c => c.UserConversations.Any(uc => uc.UserId == userId))
                .Select(c => c.ToConversation())
                .ToListAsync();
        }
        
        [Route("/conversations/{conversationId}")]
        public async Task<ActionResult<Conversation>> GetConversationById([FromRoute][Required]long conversationId)
        { 
            var conversation = await _db.Conversations.FindAsync(conversationId);
            
            if (conversation == null)
            {
                return NotFound();
            }

            return conversation.ToConversation();
        }
        
        [Route("/conversations")]
        public async Task<ActionResult<Conversation>> AddConversation([FromBody]Conversation body)
        { 
            var entity = await _db.Conversations.AddAsync(body.ToConversation());
            await _db.SaveChangesAsync();
            return entity.Entity.ToConversation();
        }
        
        [Route("/messages")]
        public async Task<ActionResult<Message>> AddMessage([FromBody]Message body)
        { 

            var entity = await _db.Messages.AddAsync(body.ToMessage());
            await _db.SaveChangesAsync();
            return entity.Entity.ToMessage();
        }
    }

    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ChatRoomContext _db;

        public UserController(ChatRoomContext context)
        {
            _db = context;
        }
        
        [Route("/login")]
        public async Task<IActionResult> LoginUser(
            [FromQuery][Required]string username, 
            [FromQuery][Required]string password)
        {
            
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == username);
            
            if (user == null)
            {
                return NotFound();
            }

            if (password != user.Password.Decrypt())
            {
                return NotFound();
            }
            
            HttpContext.Session.SetString("userId", user.UserId.ToString());
            return Ok();
        }
        
        [Route("/logout")]
        public IActionResult LogoutUser()
        { 
            HttpContext.Session.Remove("userId");
            return Ok();
        }
        
        [Route("/users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        { 
            return await _db.Users
                .Select(c => c.ToUser())
                .ToListAsync();
        }
        
        [Route("/users/{username}")]
        public async Task<ActionResult<User>> GetUserByUsername([FromRoute][Required]string username)
        { 
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == username);
            
            if (user == null)
            {
                return NotFound();
            }

            return user.ToUser();
        }
        
        [Route("/users")]
        public async Task<ActionResult<User>> CreateUser([FromBody]User body)
        {
            var entity = await _db.Users.AddAsync(body.ToUser());
            await _db.SaveChangesAsync();
            return entity.Entity.ToUser();
        }
    }
}