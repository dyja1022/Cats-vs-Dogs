using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cat_V_Dog_API.Model.User
{
    /// <summary>
    /// Model response for viewing and updating userStats
    /// </summary>
    public class UserStats
    {
        public int UserId { get; set; }
        public int TotalBattles { get; set; }
        public int Wins { get; set; }
        public int Loss { get; set; }
        public int Experience { get; set; }
        public string Affiliation { get; set; }
    }
}
