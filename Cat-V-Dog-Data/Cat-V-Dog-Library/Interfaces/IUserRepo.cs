using System;
using System.Collections.Generic;
using System.Text;

namespace Cat_V_Dog_Library.Interfaces
{
    public interface IUserRepo
    {
        public int CreateUser(string username, string password); // create user and return newuser id
        public User Login(string username, string password);
        public List<User> GetAll();
        public UserStats GetUserStats(int? userId);
        public void AssignAffiliation(string affil, int userId); //Cats or Dogs

        public bool Update(UserStats userStats);
    }
}
