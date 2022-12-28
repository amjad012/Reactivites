using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string? UserName { get; set; }
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? Image { get; set; }
        public bool Following { get; set; }//for the current user when they return another user's profile
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public ICollection<Photo> Photos{get;set;}
    }
}