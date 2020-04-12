using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Cat_V_Dog_API.Model;
using Cat_V_Dog_API.Model.Animal_Model;
using Cat_V_Dog_Library;
using Cat_V_Dog_Library.Interfaces;
using DataAnnotationsExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cat_V_Dog_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalController : ControllerBase
    {
        private readonly IAnimalRepo _animalRepo;

        public AnimalController(IAnimalRepo animalRepo)
        {
            _animalRepo = animalRepo;
        }


        // GET: api/Animal/all
        /// <summary>
        /// Returns all animals
        /// </summary>
        [Route("all")]  
        [HttpGet]
        public IActionResult All()
        {
            return Ok(Mapper.Map(_animalRepo.GetAll()));
        }


        // GET: api/Animal/5
        /// <summary>
        /// Returns animal with required userId
        /// </summary>
        /// <response code="404">UserId does not exist</response>
        [HttpGet]
        public IActionResult Get([Required] int userId)
        {
            try
            {
                return Ok(Mapper.Map(_animalRepo.Info(userId)));
            }
            catch (InvalidOperationException)
            {
                return NotFound(new ResponseMessage() { Message = $"userId does not exist: {userId}" });
            }
        }


        // PUT: api/Animal/Update
        /// <summary>
        /// Updates Animal stats with required UserId
        /// </summary>
        /// <response code="400">Invalid field(s) entry</response>
        [Route("Update")]
        [HttpPut]
        public IActionResult Put([Required] int userId, [FromBody, Bind("Strength, Speed, Intelligence, Age, Xp, NumberOfBattles")] UpdateAnimal a)
        {
            Animal animal = new Animal()
            {
                Strength = a.Strength,
                Speed = a.Speed,
                Intelligence = a.Intelligence,
                Age = a.Age,
                UserId = userId,
                Xp = a.Xp,
                NumberOfBattles = a.NumberOfBattles
            };

            var anim = _animalRepo.Update(animal);
            if (anim == null)
            {
                return NotFound(new ResponseMessage() { Message = $"userId does not exist: {userId}" });
            }
            return Ok(Mapper.Map(anim));
        }

        /*
        // DELETE: api/Animal/Delete
        /// <summary>
        /// Removes Animal with required userId
        /// </summary>
        /// <param name="userId"></param>      
        [Route("Delete")]
        [HttpDelete]
        public IActionResult Delete(int userId)
        {
            _animalRepo.Delete(userId);
            return Ok(userId);
        }
        */

        /*
        // POST: api/Animal/create
        /// <summary>
        /// Creates Animal with required UserId
        /// </summary>
        [Route("Create")]
        [HttpPost]
        public IActionResult Post([FromQuery, Bind("Strength, Speed, Intelligence, Age, UserId")] AnimalModel a)
        {
            Animal animal = new Animal()
            {
                Strength = a.Strength,
                Speed = a.Speed,
                Intelligence = a.Intelligence,
                Age = a.Age,
                UserId = a.UserId
            };

            return Ok(_animalRepo.Create(animal));
        }
        */
    }
}
