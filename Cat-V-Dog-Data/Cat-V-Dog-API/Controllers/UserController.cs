using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Cat_V_Dog_API.Model;
using Cat_V_Dog_API.Model.User_Model;
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

        // Post: api/User/create
        /// <summary>
        /// Creates User with given Username, Password, and Affiliation
        /// </summary>
        /// <returns>id of created user</returns>
        /// <response code="200">Returns successfully created user id or Username already taken</response>
        /// <response code="400">Invalid field(s) entry</response>
        [Route("create")]
        [HttpPost]
        public IActionResult Create([FromBody]NewUser newUser)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }
            try
            {
                return Ok(_usersRepo.CreateUser(newUser.Username, newUser.Password, newUser.Affiliation));
            }
            catch (InvalidOperationException)
            {
                return Ok(new ResponseMessage() { Message = "Username already taken" });
            }

        }

        // Get: api/User/login
        /// <summary>
        /// Validates if user exists with given Username and Password
        /// </summary>
        /// <response code="200">Login success - Returns User id</response>
        /// <response code="404">Login failed - No Account with this Username & Password combination</response>
        /// <response code="400">Login failed - One or more invalid field entry</response>
        [Route("login")]
        [HttpGet]
        public IActionResult Login([FromQuery]LoginUser u)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }

            var user = _usersRepo.Login(u.Username, u.Password);
            if (user != null)
            {
                // return id
                return Ok(user.Id);
            }
            else
            {
                return NotFound(new ResponseMessage() { Message = $"Username does not exist: {u.Username}" });
            }
  
        }

        // Get: api/User//all
        /// <summary>
        /// Returns list of all users (UserId, Username)
        /// </summary>
        [Route("all")]
        [HttpGet]
        public IActionResult All()
        {
            var users = Mapper.Map(_usersRepo.GetAll());
            return Ok(users);
        }

        // GET: api/User/stats/{id}
        /// <summary>
        /// Returns UserStats given userId
        /// </summary>
        /// <response code="200">Returns user stats or userID does not exist</response>
        /// <response code="400">Invalid field(s) entry</response>
        [Route("stats")]
        [HttpGet]
        public IActionResult Stats([Required]int userId)
        {
            try
            {
                return Ok(Mapper.Map(_usersRepo.GetUserStats(userId)));
            }
            catch (InvalidOperationException)
            {
                return Ok(new ResponseMessage() { Message = $"Id does not exist: {userId}" });
            }
        }

        // PUT: api/User/Update
        /// <summary>
        /// Updates User stats with required UserId
        /// </summary>
        [Route("stats/Update")]
        [HttpPut]
        public IActionResult Put([Required]int userId, [FromBody, Bind("TotalBattles, Wins, Loss, Experience")] UpdateUserStats u)
        {
            UserStats stats = new UserStats()
            {
                TotalBattles = u.TotalBattles,
                Wins = u.Wins,
                Loss = u.Loss,
                Experience = u.Experience,
                UserId = userId
            };

            var user = _usersRepo.Update(stats);
            if (user == null)
            {
                return NotFound(new ResponseMessage() { Message = $"userId does not exist: {userId}" });
            }
            return Ok(Mapper.Map(user));
        }

        /*
        // GET: api/User/affiliation/{id}
        /// <summary>
        /// Updates User Affilitation given userId
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="affil">'Cats' or 'Dogs'</param>
        [Route("affiliation")]
        [HttpPut]
        public IActionResult Affiliation(int userId, string affil)
        {
            _usersRepo.AssignAffiliation(affil, userId);
            return Ok();
        }
        */
    }
}