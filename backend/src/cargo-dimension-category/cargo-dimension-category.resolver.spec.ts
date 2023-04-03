import { Test, TestingModule } from '@nestjs/testing';
import { CargoDimensionCategoryResolver } from './cargo-dimension-category.resolver';
import { CargoDimensionCategoryService } from './cargo-dimension-category.service';

describe('CargoDimensionCategoryResolver', () => {
  let resolver: CargoDimensionCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CargoDimensionCategoryResolver, CargoDimensionCategoryService],
    }).compile();

    resolver = module.get<CargoDimensionCategoryResolver>(CargoDimensionCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
