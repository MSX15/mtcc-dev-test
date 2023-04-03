import { Test, TestingModule } from '@nestjs/testing';
import { CargoDimensionCategoryService } from './cargo-dimension-category.service';

describe('CargoDimensionCategoryService', () => {
  let service: CargoDimensionCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CargoDimensionCategoryService],
    }).compile();

    service = module.get<CargoDimensionCategoryService>(CargoDimensionCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
