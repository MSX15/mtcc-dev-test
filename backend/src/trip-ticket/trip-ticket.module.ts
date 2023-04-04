import { Module } from '@nestjs/common';
import { TripTicketService } from './trip-ticket.service';
import { TripTicketResolver } from './trip-ticket.resolver';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [TripTicketResolver, TripTicketService, PrismaService]
})
export class TripTicketModule {}
