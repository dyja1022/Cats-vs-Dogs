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
        [Route("all")]
        [HttpGet]
        public IActionResult All()
        {
            return Ok(_animalRepo.GetAll());
        }
        

        // GET: api/Animal/5
        [HttpGet("{userId}", Name = "Get")]
        public IActionResult Get(int userId)
        {
            return  Ok(_animalRepo.Info(userId));
        }

        // POST: api/Animal/create?
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

        // PUT: api/Animal/5
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

        // DELETE: api/ApiWithActions/5
        [Route("Delete")]
        [HttpDelete]
        public IActionResult Delete(int userId)
        {
            _animalRepo.Delete(userId);
            return Ok(userId);
        }
    }
}
