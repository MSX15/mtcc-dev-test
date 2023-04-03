import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCargoDimensionCategoryInput {  
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
