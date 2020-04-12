using System;
using System.Collections.Generic;
using System.Text;

namespace Cat_V_Dog_Library.Interfaces
{
    public interface IUserRepo
    {
        public int CreateUser(string username, string password, string affiliation);
        public User Login(string username, string password);
        public List<User> GetAll();
        public UserStats GetUserStats(int? userId);
        public void AssignAffiliation(string affil, int userId); //Cats or Dogs

        public UserStats Update(UserStats userStats);
        public bool DeleteUser(int userId);
    }
}
