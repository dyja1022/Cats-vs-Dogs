using System;
using System.Collections.Generic;

namespace Cat_V_Dog_Library
{
    public partial class Animal
    {
        public int Id { get; set; }
        public int? Strength { get; set; }
        public int? Speed { get; set; }
        public int? Agility { get; set; }
        public int? Intelligence { get; set; }
        public int? Xp { get; set; }
        public int? Age { get; set; }
        public int? NumberOfBattles { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}
