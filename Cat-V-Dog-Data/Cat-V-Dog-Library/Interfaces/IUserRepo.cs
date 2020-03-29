using Cat_V_Dog_Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cat_V_Dog_Library.Interfaces
{
    public interface IUserRepo
    {
        public int CreateUser(User user); // create user and return newuser id
        public User Login(string username, string password);
    }
}
