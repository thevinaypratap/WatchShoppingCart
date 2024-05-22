using Microsoft.EntityFrameworkCore;

namespace FinalProject.Models
{
    public class FinalDbContext:DbContext
    {

        public FinalDbContext(DbContextOptions<FinalDbContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<Cart> Carts { get; set; }

        public virtual DbSet<Order> Orders { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(t => t.UserType)
                .HasDefaultValue("CustomerUser");

        }


    }
}
