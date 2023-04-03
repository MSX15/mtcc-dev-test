import { Module } from '@nestjs/common';
import { CargoDimensionCategoryService } from './cargo-dimension-category.service';
import { CargoDimensionCategoryResolver } from './cargo-dimension-category.resolver';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [CargoDimensionCategoryResolver, CargoDimensionCategoryService, PrismaService]
})
export class CargoDimensionCategoryModule {}
