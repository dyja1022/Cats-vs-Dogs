using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cat_V_Dog_API.Model;
using Cat_V_Dog_Library;
using Cat_V_Dog_Library.Interfaces;
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
            return Ok(_animalRepo.GetAll());
        }


        // GET: api/Animal/5
        /// <summary>
        /// Returns animal with required userId
        /// </summary>
        [HttpGet]
        public IActionResult Get(int userId)
        {
            return  Ok(_animalRepo.Info(userId));
        }

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

        // PUT: api/Animal/Update
        /// <summary>
        /// Updates Animal stats with required UserId
        /// </summary>
        [Route("Update")]
        [HttpPut]
        public IActionResult Put([FromQuery, Bind("Strength, Speed, Intelligence, Age, Xp, UserId")] AnimalModel a)
        {
            Animal animal = new Animal()
            {
                Strength = a.Strength,
                Speed = a.Speed,
                Intelligence = a.Intelligence,
                Age = a.Age,
                UserId = a.UserId,
                Xp = a.Xp
            };

            return Ok(_animalRepo.Update(animal));
        }

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
    }
}
