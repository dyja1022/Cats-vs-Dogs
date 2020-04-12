using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cat_V_Dog_API.Model
{
    /// <summary>
    /// Model for user logging in
    /// </summary>
    public class LoginUser
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
    }
}
