import { Test, TestingModule } from '@nestjs/testing';
import { TripTicketResolver } from './trip-ticket.resolver';
import { TripTicketService } from './trip-ticket.service';

describe('TripTicketResolver', () => {
  let resolver: TripTicketResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripTicketResolver, TripTicketService],
    }).compile();

    resolver = module.get<TripTicketResolver>(TripTicketResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
