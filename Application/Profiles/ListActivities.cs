using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities // this is going to be our handler
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        //query because we're retrieving data
        // we can do it paged list by changing the <List to PagedList
        {
            public string Username { get; set; }//the user profile that we intersted in looking
            //at the activities
            public string Predicate { get; set; }// for the past , future, hosting events
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)// we want to get stuff from the database
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ActivityAttendees // activityAtendees Table
                    .Where(u => u.AppUser.UserName == request.Username)// from the table where we got the activities 
                    //where the appuser.username matches the requestor
                    .OrderBy(a => a.Activity.Date) // ordered by the activity date
                    .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)//projection to go from the activity attendees
                    //to activityDTO
                    .AsQueryable();
                
                var today = DateTime.UtcNow;

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= today),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    _ => query.Where(a => a.Date >= today)
                };

                var activities = await query.ToListAsync();

                return Result<List<UserActivityDto>>.Success(activities);
            }
        }
    }
}