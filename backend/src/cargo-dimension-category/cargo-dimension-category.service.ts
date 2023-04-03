import { Injectable } from '@nestjs/common';
import { CreateCargoDimensionCategoryInput } from './dto/create-cargo-dimension-category.input';
import { UpdateCargoDimensionCategoryInput } from './dto/update-cargo-dimension-category.input';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class CargoDimensionCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCargoDimensionCategoryInput: CreateCargoDimensionCategoryInput) {
    return await this.prisma.cargoDimensionCategory.create({
       data: { ...createCargoDimensionCategoryInput }
      //  data: {         
      //   name: createCargoDimensionCategoryInput.name,
      //   width: createCargoDimensionCategoryInput.width,
      //   depth: createCargoDimensionCategoryInput.depth,
      //   height: createCargoDimensionCategoryInput.height,
      //   unitsOfSpace: createCargoDimensionCategoryInput.unitsOfSpace
      // }
      
    })
  }

  findAll() {
    return this.prisma.cargoDimensionCategory.findMany();
  }

  findOne(id: number) {
    return this.prisma.cargoDimensionCategory.findUnique({ where: { id }})
  }

  update(id: number, updateCargoDimensionCategoryInput: UpdateCargoDimensionCategoryInput) {
    return this.prisma.cargoDimensionCategory.update({
      where: { id },
      data: { 
        name: updateCargoDimensionCategoryInput.name,
        width: updateCargoDimensionCategoryInput.width,
        depth: updateCargoDimensionCategoryInput.depth,
        height: updateCargoDimensionCategoryInput.height,
        unitsOfSpace: updateCargoDimensionCategoryInput.unitsOfSpace
      }
    })
  }

  remove(id: number) {
    return this.prisma.cargoDimensionCategory.delete({
      where: { id }
    })
  }
}
