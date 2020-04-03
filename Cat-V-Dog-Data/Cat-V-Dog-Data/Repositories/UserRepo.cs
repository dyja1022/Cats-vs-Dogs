using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Cat_V_Dog_Library.Interfaces;
using Cat_V_Dog_Library;

namespace Cat_V_Dog_Data.Repositories
{
    public class UserRepo : IUserRepo
    {
        readonly CatsVsDogsContext _db;

        public UserRepo(CatsVsDogsContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public int CreateUser(User user)
        {
            try
            {
                _db.Add(user);
                _db.SaveChanges();
                return user.Id;
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        public User Login(string username, string password)
        {
            try
            {
                var user = _db.User.Where(u => u.Username == username && u.Password == password).Single();
                // update firstlogin to true
                if (!user.FirstLogin.Value)
                {
                    user.FirstLogin = true;
                }
                _db.Update(user);
                _db.SaveChanges();
                return user;
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        public List<User> GetAll()
        {
            var users = _db.User.Select(u => u).ToList();
            return users;
        }


    }
}
