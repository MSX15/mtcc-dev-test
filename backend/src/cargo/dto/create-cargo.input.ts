import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCargoInput {
  @Field()
  description: string;
  
  @Field(() => Int)
  cargoDimensionCategoryId: number;
  
  @Field()
  cargoDimensions: string;

  @Field(() => Float)
  cargoWeight: number;
}
