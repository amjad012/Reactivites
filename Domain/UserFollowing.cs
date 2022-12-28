namespace Domain
{
    public class UserFollowing
    {
        public string ObserverId { get; set; }
        public AppUser Observer { get; set; }//this is the person who is going to follow another user
        public string TargetId { get; set; }
        public AppUser Target { get; set; }
    }
}