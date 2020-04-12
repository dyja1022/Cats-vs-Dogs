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
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS ;Database=CatsVsDogs; Trusted_Connection=True; ");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Animal>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__Animal__1788CC4C618C2FC9");

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.Age).HasDefaultValueSql("((0))");

                entity.Property(e => e.Intelligence).HasDefaultValueSql("((5))");

                entity.Property(e => e.NumberOfBattles).HasDefaultValueSql("((0))");

                entity.Property(e => e.Speed).HasDefaultValueSql("((5))");

                entity.Property(e => e.Strength).HasDefaultValueSql("((5))");

                entity.Property(e => e.Xp).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Animal)
                    .HasForeignKey<Animal>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Animal__UserId__6FB49575");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username)
                    .HasName("UQ__User__536C85E4EE440E8F")
                    .IsUnique();

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
                entity.HasKey(e => e.UserId)
                    .HasName("PK__UserStat__1788CC4C22DAC99B");

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.Affiliation)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Experience).HasDefaultValueSql("((0))");

                entity.Property(e => e.Loss).HasDefaultValueSql("((0))");

                entity.Property(e => e.TotalBattles).HasDefaultValueSql("((0))");

                entity.Property(e => e.Wins).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.UserStats)
                    .HasForeignKey<UserStats>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserStats__UserI__7849DB76");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
