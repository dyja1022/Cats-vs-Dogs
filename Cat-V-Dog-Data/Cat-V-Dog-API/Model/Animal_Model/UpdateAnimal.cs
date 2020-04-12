using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cat_V_Dog_API.Model.Animal_Model
{
    /// <summary>
    /// Model request for updating animal stats
    /// </summary>
    public class UpdateAnimal
    {
        [Required]
        [Min(0)]
        public int Strength { get; set; }
        [Required]
        [Min(0)]
        public int Speed { get; set; }
        [Required]
        [Min(0)]
        public int Intelligence { get; set; }
        [Required]
        [Min(0)]
        public int Xp { get; set; }
        [Required]
        [Min(0)]
        public int Age { get; set; }
        [Required]
        [Min(0)]
        public int NumberOfBattles { get; set; }
    }
}
