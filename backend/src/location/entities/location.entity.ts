import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Location {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Float, { nullable: true} )
  coordinateX?: number

  @Field(() => Float, { nullable: true} )
  coordinateY?: number

  @Field({ nullable: true} )
  addressDetails: string

}
