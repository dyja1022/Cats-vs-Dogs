using Cat_V_Dog_API.Model.Animal_Model;
using Cat_V_Dog_API.Model.User;
using Cat_V_Dog_API.Model.User_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cat_V_Dog_API.Model
{
    public static class Mapper
    {
        #region User
        public static AllUser Map(Cat_V_Dog_Library.User user)
        {
            return new AllUser()
            {
                Id = user.Id,
                Username = user.Username,
            };
        }
        public static List<AllUser> Map(List<Cat_V_Dog_Library.User> users)
        {
            List<AllUser> newUsers = new List<AllUser>();
            foreach(var u in users)
            {
                newUsers.Add(Map(u));
            }
            return newUsers;
        }
        public static UserStats Map(Cat_V_Dog_Library.UserStats userStats)
        {
            return new UserStats()
            {
                UserId = userStats.UserId,
                TotalBattles = userStats.TotalBattles.Value,
                Wins = userStats.Wins.Value,
                Loss = userStats.Loss.Value,
                Experience = userStats.Experience.Value,
                Affiliation = userStats.Affiliation
            };
        }
        #endregion

        #region Animal
        public static AllAnimal Map(Cat_V_Dog_Library.Animal animal)
        {
            return new AllAnimal()
            {
                UserId = animal.UserId,
                Strength = animal.Strength.Value,
                Speed = animal.Speed.Value,
                Intelligence = animal.Intelligence.Value,
                Age = animal.Age.Value,
                Xp = animal.Xp.Value,
                NumberOfBattles = animal.NumberOfBattles.Value
            };
        }
        public static List<AllAnimal> Map(List<Cat_V_Dog_Library.Animal> animal)
        {
            List<AllAnimal> newAnimals = new List<AllAnimal>();
            foreach (var a in animal)
            {
                newAnimals.Add(Map(a));
            }
            return newAnimals;
        }
        #endregion




    }
}
