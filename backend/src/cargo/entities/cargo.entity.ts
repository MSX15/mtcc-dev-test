import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CargoDimensionCategory } from 'src/cargo-dimension-category/entities/cargo-dimension-category.entity';

@ObjectType()
export class Cargo {
  @Field(() => Int)
  id: number;
  
  @Field()
  description: string;
  
  @Field(() => Int)
  cargoDimensionCategoryId: number;

  @Field()
  // @Field({nullable: true})
  cargoDimensionCategory: CargoDimensionCategory
  
  @Field()
  cargoDimensions: string;

  @Field(() => Float)
  cargoWeight: number;

}
