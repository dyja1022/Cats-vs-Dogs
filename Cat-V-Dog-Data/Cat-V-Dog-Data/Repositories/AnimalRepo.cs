using Cat_V_Dog_Library;
using Cat_V_Dog_Library.Interfaces;
using Microsoft.EntityFrameworkCore;
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

        public bool Create(Animal animal)
        {
            try 
            { 
                // check if referenced userID exists
                var user = _db.User.Where(u => u.Id == animal.UserId).Single();
                _db.Animal.Add(animal);
                _db.SaveChanges();
                return true;
            }
            catch (InvalidOperationException)
            {
                // user dne
                return false;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }

        public bool Update(Animal animal)
        {
            try
            {
                //check if referenced animal exists
                var refAnim = _db.Animal.Where(a => a.Id == animal.Id).Single();

                _db.Animal.Update(animal);
                _db.SaveChanges();
                return true;
            } catch (InvalidOperationException)
            {
                //animal dne
                return false;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }

        public void Delete(int animalId)
        {
            var animToRemove = _db.Animal.Where(a => a.Id == animalId).Single();

            _db.Remove(animToRemove);
            _db.SaveChanges();
        }
    }
}
