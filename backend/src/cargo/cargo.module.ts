import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoResolver } from './cargo.resolver';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [CargoResolver, CargoService, PrismaService]
})
export class CargoModule {}
