using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class UserActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }

        [JsonIgnore]//property that we add to our class to help us, but 
        //we dont actually want to return to the client
        public string HostUsername { get; set; }
    }
    }
    
