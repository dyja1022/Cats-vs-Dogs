using Cat_V_Dog_Library;
using Cat_V_Dog_Library.Interfaces;
using System;
using System.Linq;

namespace Cat_V_Dog_Data.Repositories
{
    public class AnimalRepo : IAnimalRepo
    {
        readonly CatsVsDogsContext _db;

        public AnimalRepo(CatsVsDogsContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public void Create(Animal animal)
        {
            // check if userID exists
            var user = _db.User.Where(u => u.Id == animal.UserId);


        }

        public void Delete(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
