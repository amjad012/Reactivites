using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
#nullable disable
            public Activity Activity { get; set; }

#nullable restore

        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
#nullable disable

                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
#nullable restore

            }
        }
    }
}