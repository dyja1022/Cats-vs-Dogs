using System;
using System.Collections.Generic;
using System.Text;

namespace Cat_V_Dog_Data.Models
{
    public class Animal
    {
        public int Strength { get; set; }
        public int Speed { get; set; }
        public int Agility { get; set; }
        public int Intelligence { get; set; }
        public int Xp { get; set; }
        public int Age { get; set; }
        public int NumberOfBattles { get; set; }

        //will be foreign key taken from user class
        public int UserId { get; set; }
    }
}
