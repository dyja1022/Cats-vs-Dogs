using System;
using System.Collections.Generic;

namespace Cat_V_Dog_Library
{
    public partial class UserStats
    {
        public int UserId { get; set; }
        public int? TotalBattles { get; set; }
        public int? Wins { get; set; }
        public int? Loss { get; set; }
        public int? Experience { get; set; }
        public string Affiliation { get; set; }

        public virtual User User { get; set; }
    }
}
