import { Injectable } from '@nestjs/common';
import { CreateCargoInput } from './dto/create-cargo.input';
import { UpdateCargoInput } from './dto/update-cargo.input';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService) {}

  async create(createCargoInput: CreateCargoInput) {
    return await this.prisma.cargo.create({
       data: { ...createCargoInput }
    })
  }

  findAll() {
    return this.prisma.cargo.findMany({
      include: { cargoDimensionCategory: true }
    });
  }

  findOne(id: number) {
    return this.prisma.cargo.findUnique({ 
      where: { id },
      include: { cargoDimensionCategory: true }
    })
  }

  update(id: number, updateCargoInput: UpdateCargoInput) {
    return this.prisma.cargo.update({
      where: { id },
      data: { 
        description: updateCargoInput.description,
        cargoDimensionCategoryId: updateCargoInput.cargoDimensionCategoryId,
        cargoDimensions: updateCargoInput.cargoDimensions,
        cargoWeight: updateCargoInput.cargoWeight
      }
    })
  }

  remove(id: number) {
    return this.prisma.cargo.delete({
      where: { id }
    })
  }
}
