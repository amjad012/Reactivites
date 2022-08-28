using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        #nullable disable
        public DataContext(DbContextOptions options) : base(options)
        {
                
        }
        #nullable restore

        public DbSet<Activity> Activities { get; set; }
    }
}