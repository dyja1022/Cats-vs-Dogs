﻿using System;
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

        public int CreateUser(string username, string password)
        {
            try
            {
                // stored procedure to create user + create userstats entries
                var user = _db.User.FromSqlRaw("EXEC CreateUser @UserId={0}, @Username={1}, @Password={2}", 0, username, password).AsEnumerable().Single();
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
                // update firstlogin to true
                if (!user.FirstLogin.Value)
                {
                    user.FirstLogin = false;
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

        public UserStats GetUserStats(int? userId)
        {
            var userStat = _db.UserStats.Where(u => u.UserId == userId).Single();

            return userStat;
        }

        public void AssignAffiliation(string affil, int userId)
        {
            var user = _db.UserStats.Where(u => u.UserId == userId).Single();
            user.Affiliation = affil;
            _db.Update(user);
            _db.SaveChanges();
        }

        public bool Update(UserStats userStats)
        {
            try
            {
                //check if referenced user exists
                var refUser = GetUserStats(userStats.UserId);
                //TotalBattles, Wins, Loss, Experience, Affiliation
                
                refUser.TotalBattles = userStats.TotalBattles.HasValue ? userStats.TotalBattles.Value : refUser.TotalBattles;
                refUser.Wins = userStats.Wins.HasValue ? userStats.Wins.Value : refUser.Wins;
                refUser.Loss = userStats.Loss.HasValue ? userStats.Loss.Value : refUser.Loss;
                refUser.Experience = userStats.Experience.HasValue ? userStats.Experience.Value : refUser.Experience;

                _db.UserStats.Update(refUser);
                _db.SaveChanges();
                return true;
            }
            catch (InvalidOperationException)
            {
                //user stats dne
                return false;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }
    }
}
