import { Test, TestingModule } from '@nestjs/testing';
import { TripTicketService } from './trip-ticket.service';

describe('TripTicketService', () => {
  let service: TripTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripTicketService],
    }).compile();

    service = module.get<TripTicketService>(TripTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
