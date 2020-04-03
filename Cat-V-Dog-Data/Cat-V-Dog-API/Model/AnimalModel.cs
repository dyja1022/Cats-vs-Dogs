using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cat_V_Dog_API.Model
{
    public class AnimalModel
    {
        public int Id { get; set; }
        public int? Strength { get; set; }
        public int? Speed { get; set; }
        public int? Intelligence { get; set; }
        public int? Xp { get; set; }
        public int? Age { get; set; }
        public int? NumberOfBattles { get; set; }
        public int? UserId { get; set; }
    }
}
