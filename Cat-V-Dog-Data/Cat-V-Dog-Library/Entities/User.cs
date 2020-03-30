using System;
using System.Collections.Generic;

namespace Cat_V_Dog_Library
{
    public partial class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool? FirstLogin { get; set; }
    }
}
