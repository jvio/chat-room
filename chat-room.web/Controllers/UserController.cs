using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using chat_room.web.Controllers.Extensions;
using chat_room.web.Controllers.Models;
using chat_room.web.Data;
using chat_room.web.Data.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace chat_room.web.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ChatRoomContext _db;

        public UserController(ChatRoomContext context)
        {
            _db = context;
        }
        
        [HttpGet]
        [Route("/users/login")]
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
            
            HttpContext.Session.SetInt64("userId", user.UserId);
            return Ok();
        }
        
        [HttpGet]
        [Route("/users/logout")]
        public IActionResult LogoutUser()
        { 
            HttpContext.Session.Remove("userId");
            return Ok();
        }
        
        [HttpGet]
        [Route("/users/logged")]
        public async Task<ActionResult<User>> GetUserLogged()
        { 
            var userId = HttpContext.Session.GetInt64("userId");
            if (userId == null)
            {
                return NotFound();
            }
            
            var user = await _db.Users.FindAsync(userId);
            
            if (user == null)
            {
                return NotFound();
            }

            return user.ToUser();
        }
        
        [HttpGet]
        [Route("/users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        { 
            return await _db.Users
                .Select(c => c.ToUser())
                .ToListAsync();
        }
        
        [HttpGet]
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
        
        [HttpPost]
        [Route("/users")]
        public async Task<ActionResult<User>> CreateUser([FromBody]User body)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == body.Username);
            
            if (user != null)
            {
                return BadRequest();
            }

            body.Password = body.Password.Encrypt();
            
            var entity = await _db.Users.AddAsync(body.ToUser());
            await _db.SaveChangesAsync();
            return entity.Entity.ToUser();
        }
    }
}