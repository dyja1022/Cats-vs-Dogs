using Cat_V_Dog_Library;
using Cat_V_Dog_Library.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
                // check if user already has animal
                if (_db.Animal.Any(a => a.UserId == animal.UserId))
                    return false;

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

        public Animal Update(Animal animal)
        {
            try
            {
                //check if referenced animal exists
                var refAnim = _db.Animal.Where(a => a.UserId == animal.UserId).Single();
                if (refAnim == null)
                {
                    // userId does not exist
                    return null;
                }

                refAnim.Strength = animal.Strength.Value;
                refAnim.Speed = animal.Speed.Value;
                refAnim.Intelligence = animal.Intelligence.Value;
                refAnim.NumberOfBattles = animal.NumberOfBattles.Value;
                refAnim.Xp = animal.Xp.Value;
                refAnim.Age = animal.Age.Value;
                refAnim.NumberOfBattles = animal.NumberOfBattles;

                _db.Animal.Update(refAnim);
                _db.SaveChanges();
                return refAnim;
            } catch (InvalidOperationException)
            {
                //animal dne
                return null;
            }
            catch (DbUpdateException)
            {
                return null;
            }
        }

        public void Delete(int userId)
        {
            var animToRemove = _db.Animal.Where(a => a.UserId == userId).Single();

            _db.Remove(animToRemove);
            _db.SaveChanges();
        }

        public Animal Info(int userId)
        {
            var anim = _db.Animal.Where(a => a.UserId == userId).Single();
            return anim;
        }

        public List<Animal> GetAll()
        {
            var animals = _db.Animal.Select(u => u).ToList();
            return animals;
        }
    }
}
