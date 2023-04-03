import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CargoDimensionCategoryService } from './cargo-dimension-category.service';
import { CargoDimensionCategory } from './entities/cargo-dimension-category.entity';
import { CreateCargoDimensionCategoryInput } from './dto/create-cargo-dimension-category.input';
import { UpdateCargoDimensionCategoryInput } from './dto/update-cargo-dimension-category.input';

@Resolver(() => CargoDimensionCategory)
export class CargoDimensionCategoryResolver {
  constructor(private readonly cargoDimensionCategoryService: CargoDimensionCategoryService) {}

  @Mutation(() => CargoDimensionCategory)
  createCargoDimensionCategory(@Args('createCargoDimensionCategoryInput') createCargoDimensionCategoryInput: CreateCargoDimensionCategoryInput) {
    return this.cargoDimensionCategoryService.create(createCargoDimensionCategoryInput);
  }

  @Query(() => [CargoDimensionCategory], { name: 'cargoDimensionCategory' })
  findAll() {
    return this.cargoDimensionCategoryService.findAll();
  }

  @Query(() => CargoDimensionCategory, { name: 'cargoDimensionCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cargoDimensionCategoryService.findOne(id);
  }

  @Mutation(() => CargoDimensionCategory)
  updateCargoDimensionCategory(@Args('updateCargoDimensionCategoryInput') updateCargoDimensionCategoryInput: UpdateCargoDimensionCategoryInput) {
    return this.cargoDimensionCategoryService.update(updateCargoDimensionCategoryInput.id, updateCargoDimensionCategoryInput);
  }

  @Mutation(() => CargoDimensionCategory)
  removeCargoDimensionCategory(@Args('id', { type: () => Int }) id: number) {
    return this.cargoDimensionCategoryService.remove(id);
  }
}
