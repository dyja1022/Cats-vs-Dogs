using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Cat_V_Dog_Library.Interfaces;
using Cat_V_Dog_Library;
using Microsoft.Data.SqlClient;

namespace Cat_V_Dog_Data.Repositories
{
    public class UserRepo : IUserRepo
    {
        readonly CatsVsDogsContext _db;

        public UserRepo(CatsVsDogsContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public int CreateUser(string username, string password, string affiliation)
        {
            try
            {
                // stored procedure to create user + create userstats entries
                var user = _db.User.FromSqlRaw("EXEC CreateUser @UserId={0}, @Username={1}, @Password={2}, @Affiliation={3} ", 0, username, password, affiliation).AsEnumerable().Single();
                return user.Id;
            }
            catch (ArgumentNullException)
            {
                throw;
            }
            catch (InvalidOperationException)
            {
                throw;
            }
            
        }

        public User Login(string username, string password)
        {
            try
            {
                var user = _db.User.Where(u => u.Username == username && u.Password == password).Single();
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

        public UserStats GetUserStats(int? userId)
        {
            try
            {
                var userStat = _db.UserStats.Where(u => u.UserId == userId).Single();
                return userStat;
            }
            catch (InvalidOperationException)
            {
                // id does not exist in db
                throw;
            }

        }

        public void AssignAffiliation(string affil, int userId)
        {
            var user = _db.UserStats.Where(u => u.UserId == userId).Single();
            user.Affiliation = affil;
            _db.Update(user);
            _db.SaveChanges();
        }

        public UserStats Update(UserStats userStats)
        {
            try
            {
                var refUser = GetUserStats(userStats.UserId);
                if (refUser == null)
                {
                    // user does not exist
                    return null;
                }

                // Only updates (TotalBattles, Wins, Loss, and Experience)
                // Keeps affiliation
                refUser.TotalBattles = userStats.TotalBattles.Value;
                refUser.Wins = userStats.Wins.Value;
                refUser.Loss = userStats.Loss.Value;
                refUser.Experience = userStats.Experience.Value;

                _db.UserStats.Update(refUser);
                _db.SaveChanges();
                return refUser;
            }
            catch (InvalidOperationException)
            {
                return null;
            }

        }
    }
}
