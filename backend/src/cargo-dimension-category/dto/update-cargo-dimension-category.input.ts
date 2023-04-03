import { CreateCargoDimensionCategoryInput } from './create-cargo-dimension-category.input';
import { InputType, Field, Int, Float, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCargoDimensionCategoryInput extends PartialType(CreateCargoDimensionCategoryInput) {
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
