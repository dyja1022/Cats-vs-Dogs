using System;

namespace Cat_V_Dog_Data
{
    public class Animal
    {
        public int Strength { get; set; }
        public int Speed { get; set; }
        public int Agility { get; set; }
        public int Intelligence { get; set; }
        public int XP { get; set; }
        public int Age { get; set; }
        public int numberOfBattles { get; set; }

        //will be foreign key taken from user class
        public int userId {get;set;}
    }
}
