using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Cat_V_Dog_Library.Interfaces;

namespace Cat_V_Dog_Data.Repositories
{
    public class UserRepo : IUserRepo
    {
        readonly CVD_DbContext _db;

        public UserRepo(CVD_DbContext db)
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
                var user = _db.users.Where(u => u.Username == username && u.Password == password).Single();
                // update firstlogin to true
                if (!user.FirstLogin)
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
    }
}
