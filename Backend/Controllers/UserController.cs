using FinalProject.Models;
using FinalProject.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FinalProject.Service.IService;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    /*[EnableCors("policy")]*/
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService userInterface;
        public UserController(IUserService userInterface)
        {
            this.userInterface = userInterface;

        }



        [HttpGet]
      // [Authorize(Roles ="Admin")]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            var result = await userInterface.GetAll();
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }
        [HttpGet("{id:int}")]
        public  ActionResult<User> GetUserById(int id)
        {
            var user =  userInterface.GetUserById(id);
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }



        [HttpPut("{id:int}")]
        public async Task<ActionResult<User>> UpdateUser(int id, [FromBody] User user)
        {
            var result = await userInterface.UpdateUserDetail(id, user);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpPost("login/{email}/{password}")]
        public Task<string> Login([FromRoute]string email, string password)
        {
            var result = userInterface.Login(email, password);

            if (result != null)
            {
                return result;
            }
            return null;
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUser([FromBody] User user)
        {
            var result = await userInterface.AddUserAsync(user);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("User already exist.Please login");

        }

        private int getid()
        {
            var id = HttpContext.User.FindFirst("UserId").Value;
            return int.Parse(id);
        }

    }
}
