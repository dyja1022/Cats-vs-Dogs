using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Cat_V_Dog_Library
{
    public partial class CatsVsDogsContext : DbContext
    {
        public CatsVsDogsContext()
        {
        }

        public CatsVsDogsContext(DbContextOptions<CatsVsDogsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Animal> Animal { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserStats> UserStats { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=LAPTOP-5VQ0CSFS\\SQLEXPRESS ;Database=CatsVsDogs; Trusted_Connection=True; ");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Animal>(entity =>
            {
                entity.Property(e => e.Age).HasDefaultValueSql("((0))");

                entity.Property(e => e.Intelligence).HasDefaultValueSql("((5))");

                entity.Property(e => e.NumberOfBattles).HasDefaultValueSql("((0))");

                entity.Property(e => e.Speed).HasDefaultValueSql("((5))");

                entity.Property(e => e.Strength).HasDefaultValueSql("((5))");

                entity.Property(e => e.Xp).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Animal)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Animal__UserId__0C85DE4D");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.FirstLogin).HasDefaultValueSql("((1))");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserStats>(entity =>
            {
                entity.Property(e => e.Affiliation)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Experience).HasDefaultValueSql("((0))");

                entity.Property(e => e.Loss).HasDefaultValueSql("((0))");

                entity.Property(e => e.TotalBattles).HasDefaultValueSql("((0))");

                entity.Property(e => e.Wins).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserStats)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserStats__UserI__14270015");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
