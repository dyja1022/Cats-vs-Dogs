using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cat_V_Dog_Data;
using Cat_V_Dog_Library;
using Cat_V_Dog_Library.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cat_V_Dog_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _usersRepo;

        public UserController(IUserRepo usersRepo)
        {
            _usersRepo = usersRepo;
        }

        /// <summary>
        /// Creates User with given Username and Password
        /// </summary>
        /// <response code="200">User successfully created</response>
        /// <response code="500">Creating user failed</response>
        [Route("create")]
        [HttpPost]
        public IActionResult Create(string username, string password)
        {
            return Ok(_usersRepo.CreateUser(username, password));
        }

        /// <summary>
        /// Validates if user exists with given Username and Password
        /// and updates firstlogin to false
        /// </summary>
        /// <response code="200">Login success</response>
        /// <response code="204">Login failed</response>
        [Route("login")]
        [HttpGet]
        public IActionResult Login([FromQuery, Bind("Username,Password")]User u)
        {

            var user = _usersRepo.Login(u.Username, u.Password);
            if (user != null)
            {
                // User to only show id, name, and username
                User loggedinUser = new User()
                {
                    Id = user.Id,
                    Username = user.Username,
                    FirstLogin = user.FirstLogin
                };
                return Ok(loggedinUser);
            }
            else
            {
                return Ok(null);
            }
        }

        /// <summary>
        /// Returns all users
        /// </summary>
        [Route("all")]
        [HttpGet]
        public IActionResult All()
        {
            return Ok(_usersRepo.GetAll());
        }

        // GET: api/User/stats/{id}
        /// <summary>
        /// Returns UserStats given userId
        /// </summary>
        [Route("stats/{userId}")]
        [HttpGet]
        public IActionResult Stats(int userId)
        {
            return Ok(_usersRepo.GetUserStats(userId));
        }

        // GET: api/User/affiliation/{id}
        /// <summary>
        /// Updates User Affilitation given userId
        /// </summary>
        /// <param name="affil">'Cats' or 'Dogs'</param>
        [Route("affiliation")]
        [HttpPut]
        public IActionResult Affiliation(int userId, string affil)
        {
            _usersRepo.AssignAffiliation(affil, userId);
            return Ok();
        }
    }
}