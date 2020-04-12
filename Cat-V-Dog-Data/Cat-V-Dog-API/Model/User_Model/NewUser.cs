using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cat_V_Dog_API.Model
{
    /// <summary>
    /// Model for registering new user
    /// </summary>
    public class NewUser
    {
        /// <summary>
        ///  Minimum of 8 characters
        /// </summary>
        /// <example>Username</example>
        [Required]
        [StringLength(50, MinimumLength = 8, ErrorMessage = "Minimum of 8 characters.")]
        public string Username { get; set; }
        /// <summary>
        ///  Minimum of 8 characters
        /// </summary>
        /// <example>Password</example>
        [Required]
        [StringLength(50, MinimumLength = 8, ErrorMessage = "Minimum of 8 characters.")]
        public string Password { get; set; }
        /// <summary>
        ///  Valid values are 'Cats' or 'Dogs'
        /// </summary>
        /// <example>Cats</example>
        [Required]
        [RegularExpression("Cats|Dogs", ErrorMessage = "Only valid values are 'Cats' or 'Dogs'.")]
        public string Affiliation { get; set; }

    }
}
