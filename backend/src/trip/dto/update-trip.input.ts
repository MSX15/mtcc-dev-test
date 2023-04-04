import { CreateTripInput } from './create-trip.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { isNullableType } from 'graphql';
import { TripTicket } from 'src/trip-ticket/entities/trip-ticket.entity';

@InputType()
export class UpdateTripInput extends PartialType(CreateTripInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, {nullable: true})
  fromLocationId: number

  @Field(() => Int, {nullable: true})
  toLocationId: number  

  @Field({nullable: true})
  departure: Date    

  @Field({nullable: true})
  arrival: Date     

  @Field(() => Int, { nullable: true })
  createdById: number;

  @Field(() => Int, { nullable: true })
  modifiedById: number;
}
