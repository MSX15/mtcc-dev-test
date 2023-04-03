import { CreateCargoInput } from './create-cargo.input';
import { InputType, Field, Int, Float, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCargoInput extends PartialType(CreateCargoInput) {
  @Field(() => Int)
  id: number;
  
  @Field()
  description: string;
  
  @Field(() => Int)
  cargoDimensionCategoryId: number;
  
  @Field()
  cargoDimensions: string;

  @Field(() => Float)
  cargoWeight: number;
}
