import { CreateTripTicketInput } from './create-trip-ticket.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTripTicketInput {
  @Field(() => Int)
  id: number;

  // @Field(() => Int)
  // tripId: number;

  @Field(() => Int, {nullable: true})
  personId: number;

  @Field(() => Int, {nullable: true})
  cargoId: number;

  @Field(() => Int, {nullable: true})
  dependentTripId: number;

  @Field(() => Int, {nullable: true})
  tripRequestId: number;

  @Field(() => Int, {nullable: true})
  statusId: number;  
  
  @Field(() => Int, { nullable: true })
  createdById: number;

  @Field(() => Int, { nullable: true })
  modifiedById: number;
}
