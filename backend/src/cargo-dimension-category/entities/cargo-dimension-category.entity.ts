import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class CargoDimensionCategory {
  @Field(() => Int)
  id: number;
  
  @Field()
  name: string;

  @Field(() => Int)
  width: number;

  @Field(() => Int)
  depth: number;
  
  @Field(() => Int)
  height: number;

  @Field(() => Float)
  unitsOfSpace: number;
}
