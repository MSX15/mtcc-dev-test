import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TripTicketService } from './trip-ticket.service';
import { TripTicket } from './entities/trip-ticket.entity';
import { CreateTripTicketInput } from './dto/create-trip-ticket.input';
import { UpdateTripTicketInput } from './dto/update-trip-ticket.input';
import { UpdateStatusOfEntityInput } from 'src/status/dto/update-status-of-entity.input';


@Resolver(() => TripTicket)
export class TripTicketResolver {
  constructor(private readonly tripTicketService: TripTicketService) {}

  @Mutation(() => TripTicket)
  createTripTicket(@Args('createTripTicketInput') createTripTicketInput: CreateTripTicketInput) {
    return this.tripTicketService.create(createTripTicketInput);
  }

  @Query(() => [TripTicket], { name: 'tripTickets' })
  findAll() {
    return this.tripTicketService.findAll();
  }

  @Query(() => TripTicket, { name: 'tripTicket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tripTicketService.findOne(id);
  }

  // @Mutation(() => TripTicket)
  // updateTripTicket(@Args('updateTripTicketInput') updateTripTicketInput: UpdateTripTicketInput) {
  //   return this.tripTicketService.update(updateTripTicketInput.id, updateTripTicketInput);
  // }

  @Mutation(() => TripTicket)
  updateTripTicketStatus(@Args('updateTripTickeStatustInput') updateTripTicketInput: UpdateStatusOfEntityInput) {
    return this.tripTicketService.updateStatus(updateTripTicketInput.entityId, updateTripTicketInput.entityStatusId);
  }
}
