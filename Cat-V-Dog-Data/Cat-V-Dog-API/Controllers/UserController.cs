using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cat_V_Dog_Data;
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
                _usersRepo.CreateUser(user);
                return Ok(true);
            }
            catch (ArgumentException)
            {
                return Ok(false);
            }
        }

        [Route("login")]
        [HttpGet]
        public IActionResult Login([FromBody, Bind("username,password")]User user)
        {
            var u = _usersRepo.Login(user.Username, user.Password);
            if (u != null)
            {
                // User to only show id, name, and username
                User loggedinUser = new User()
                {
                    Id = u.Id,
                    Username = u.Username
                };
                return Ok(loggedinUser);
            }
            else
            {
                return Ok(null);
            }
        }



    }
}