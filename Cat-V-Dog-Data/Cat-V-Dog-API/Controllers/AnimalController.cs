using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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


        // GET: api/Animal
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Animal/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Animal
        [HttpPost]
        public void Post([FromBody, Bind("Strength, Speed, Agility, Intelligence, Age, UserId")] Animal a)
        {
            Animal animal = new Animal()
            {
                Strength = a.Strength,
                Speed = a.Speed,
                Agility = a.Agility,
                Intelligence = a.Intelligence,
                Age = a.Age,
                UserId = a.UserId
            };

            _animalRepo.Create(animal);
        }

        // PUT: api/Animal/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
