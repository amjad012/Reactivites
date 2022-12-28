using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>> //We don't need to return any data from this
        // We're merely updating our database
        {
            public string TargetUsername { get; set; }//the target user that this user is attempting to follow.
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor; 
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetUsername());//This is the user we're going to use to follow the user

                var target = await _context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == request.TargetUsername);

                if (target == null) return null;//this is a parameter that we're receiving from the client.
              
                var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id);

                 // check to see if the following is null, if it's null, we're going to create
                //a new following. If it's not null, we going to simply remove the following.
                if (following == null)
                {
                    following = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };

                    _context.UserFollowings.Add(following);
                }
                else
                {
                    _context.UserFollowings.Remove(following);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to update following");
            }
        }

    }
}