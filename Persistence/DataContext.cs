using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        #nullable disable
        public DataContext(DbContextOptions options) : base(options)
        {
                
        }
        #nullable restore

        public DbSet<Activity> Activities { get; set; }
    }
}