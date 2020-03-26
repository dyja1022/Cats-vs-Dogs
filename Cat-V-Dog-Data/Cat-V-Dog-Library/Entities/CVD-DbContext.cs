using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cat_V_Dog_Data
{
    public class CVD_DbContext : DbContext
    {
        public CVD_DbContext()
        {

        }
        public CVD_DbContext(DbContextOptions<CVD_DbContext> options) : base(options)
        {

        }

        public DbSet<Animal> animals { get; set; }
        public DbSet<User> users { get; set; }
    }
}
