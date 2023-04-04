import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTripRequestInput {
  @Field(() => Int)
  fromLocationId: number;

  @Field(() => Int)
  toLocationId: number;

  @Field({ nullable: true })
  departEarliest: Date
  
  @Field({ nullable: true })
  departLatest: Date
  
  @Field({ nullable: true })
  arriveEarliest: Date
  
  @Field({ nullable: true })
  arriveLatest: Date

  @Field(() => Int, { nullable: true })
  createdById: number;

  @Field(() => Int, { nullable: true })
  modifiedById: number;

  @Field({ nullable: true })
  remarks: string
}
