using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Text;

namespace Cat_V_Dog_Data
{
    public class CVD_DbContext : DbContext
    {
        public CVD_DbContext():base()
        {
        }

        DbSet<Animal> Animals { get; set; }
        DbSet<User> Users { get; set; }
    }
}
