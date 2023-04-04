import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTripInput {

  @Field(() => Int)
  fromLocationId: number

  @Field(() => Int)
  toLocationId: number  

  @Field()
  departure: Date    

  @Field()
  arrival: Date     

  @Field(() => Int, { nullable: true })
  peopleCapacity :number

  @Field(() => Int, { nullable: true })
  cargoVolumeCapacity  :number

  @Field(() => Int, { nullable: true })
  cargoWeightCapacity  :number

  @Field(() => Int, { nullable: true })
  tripRequestId  :number
  
  @Field(() => Int, { nullable: true })
  peopleCount    :number
  
  @Field(() => Int, { nullable: true })
  cargoWeight    :number
  
  @Field(() => Int, { nullable: true })
  cargoVolume    :number

}
