using System;
using System.Collections.Generic;
using System.Text;

namespace Cat_V_Dog_Data.Models
{
    class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool FirstLogin { get; set; }
    }
}
