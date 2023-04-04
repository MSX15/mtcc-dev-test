import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTripTicketInput {
  @Field(() => Int)
  tripId: number;

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
}
