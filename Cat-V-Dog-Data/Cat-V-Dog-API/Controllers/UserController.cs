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

        [Route("create")]
        [HttpPost]
        public IActionResult Create([FromBody, Bind("username,password")]User user)
        {
            try
            {
                _usersRepo.CreateUser(user.Username, user.Password);
                return Ok(true);
            }
            catch (ArgumentException)
            {
                return Ok(false);
            }
        }

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

        [Route("all")]
        [HttpGet]
        public IActionResult All()
        {
            return Ok(_usersRepo.GetAll());
        }

        // GET: api/User/stats/{id}
        [Route("stats/{id}")]
        [HttpGet]
        public IActionResult Stats(int id)
        {
            return Ok(_usersRepo.GetUserStats(id));
        }

        // GET: api/User/affiliation/{id}
        [Route("affiliation")]
        [HttpPut]
        public IActionResult Affiliation(int id, string affil)
        {
            _usersRepo.AssignAffiliation(affil, id);
            return Ok();
        }
    }
}