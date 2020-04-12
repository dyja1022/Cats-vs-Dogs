using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cat_V_Dog_API.Model.User_Model
{
    /// <summary>
    /// Model requested when updating userStats
    /// </summary>
    public class UpdateUserStats
    {
        [Required]
        public int TotalBattles { get; set; }
        [Required]
        public int Wins { get; set; }
        [Required]
        public int Loss { get; set; }
        [Required]
        public int Experience { get; set; }
    }
}
