import { Injectable } from '@nestjs/common';
import { CreateTripInput } from './dto/create-trip.input';
import { UpdateTripInput } from './dto/update-trip.input';
import { UpsertTripTicketstInput } from './dto/upsert-trip-tickets.input';
import { PrismaService } from 'src/services/prisma.service';
import { TripFilter } from './entities/trip.filter';
import * as dayjs from 'dayjs'

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  readonly includes = { 
    fromLocation: true,
    toLocation: true,
    createdBy: true,
    modifiedBy: true,
    tripRequest: {
      include: {
        createdBy: true,
        modifiedBy: true
      }
    },
    tripTickets: {
      include: {
        person: true,
        cargo: {
          include: {
            cargoDimensionCategory: true
          }
        }
      }
    },
    status: true
  }


  async create(createTripInput: CreateTripInput) {
    return await this.prisma.trip.create({
       data: {
        ...createTripInput,
        statusId: 1,
        createdById: 1,
        createdAt: dayjs().toDate(),
        modifiedById: 1,
        modifiedAt: dayjs().toDate(),
      }
    })
  }

  async findAll(tripFilter: TripFilter) {
    if(tripFilter)
    {
      // let fil = {};
      // if(tripFilter.startDate)
      // {
      //   fil.gte = tripFilter.startDate
      // }
      // if(tripFilter.endDate)
      // {
      //   fil.lte = tripFilter.endDate
      // }
      return await this.prisma.trip.findMany({
        where: {
          AND: [
            {
              departure: {
                gte: tripFilter.startDate,
              },
            },
            {
              departure: {
                lte: tripFilter.endDate,
              },
            },
          ],
        },
        include: { 
          ...this.includes
        }
      })
    }
    return await this.prisma.trip.findMany({
      include: { 
        ...this.includes
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.trip.findUnique({ 
      where: { id },
      include: { 
        ...this.includes
      }
    })
  }

  async update(id: number, updateTripInput: UpdateTripInput) {
    const {id: entityId, ...entityDataUpdated} = updateTripInput;
    const randModifiedById = (Math.floor(Math.random() * 6) + 2)

    // const entity = await this.prisma.trip.findUnique({ where: { id } })
    await this.prisma.trip.update({
      where: { id },
      data: { 
        // ...entity,
        ...entityDataUpdated,
        modifiedById: randModifiedById,
        modifiedAt: dayjs().toDate()
      }
    })
    return await this.prisma.trip.findUnique({ 
      where: { id } ,
      include: { 
        ...this.includes
      }
    });
  }

  async updateStatus(id: number, entityStatusId: number) {
    // const entity = await this.prisma.trip.findUnique({ where: { id } })
    const randModifiedById = (Math.floor(Math.random() * 6) + 2)
    await this.prisma.trip.update({
      where: { id },
      data: { 
        // ...entity,
        statusId: entityStatusId,
        modifiedById: randModifiedById,
        modifiedAt: dayjs().toDate()
      }
    })

    await this.prisma.tripTicket.updateMany({
      where: { tripId: id },
      data:
      {
        statusId: entityStatusId,
      }
    })

    return await this.prisma.trip.findUnique({ 
      where: { id } ,
      include: { 
        ...this.includes
      }
    });
  }

  async upsertTripTickets(id: number, upsertTripTicketstInput: UpsertTripTicketstInput) {
    const randModifiedById = (Math.floor(Math.random() * 6) + 2)
    await this.prisma.trip.update({
      include: { tripTickets: true },
      where: { id },
      data: { 
        tripTickets:{
          connectOrCreate:[
            {
              create: { 
                personId: upsertTripTicketstInput.personId,
                cargoId: upsertTripTicketstInput.cargoId,
                dependentTripId: upsertTripTicketstInput.dependentTripId,
                tripRequestId: upsertTripTicketstInput.tripRequestId,
                statusId: 1,
                createdById: 1,
                createdAt: dayjs().toDate(),
                modifiedById: 1,
                modifiedAt: dayjs().toDate(),
              },
              where: {
                id: upsertTripTicketstInput.ticketId,
              },
            }
          ]
        },
      }
    })


    return await this.prisma.trip.findUnique({ 
      where: { id } ,
      include: { 
        ...this.includes
      }
    });
  }
}
