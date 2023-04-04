import { Injectable } from '@nestjs/common';
import { CreateTripTicketInput } from './dto/create-trip-ticket.input';
import { UpdateTripTicketInput } from './dto/update-trip-ticket.input';
import { PrismaService } from 'src/services/prisma.service';
import { ApolloError, ValidationError } from 'apollo-server-express';
import * as dayjs from 'dayjs'


@Injectable()
export class TripTicketService {
  constructor(private prisma: PrismaService) {}

  readonly includes = { 
    trip: {
      include: {
        fromLocation: true,
        toLocation: true,
        status: {
          select: {
            name: true
          }
        }
      }
    },
    person: true,
    cargo: {
      include:
      {
        cargoDimensionCategory: true
      }
    },
    createdBy: true,
    modifiedBy: true,
    status: true
  }


  async create(createTripTicketInput: CreateTripTicketInput) {
    try
    {

      const trip = await this.prisma.trip.findUnique({
        where: { id: createTripTicketInput.tripId }
      })


      const totalCargoVolume = trip.cargoVolume;
      const totalCargoWeight = trip.cargoWeight;
      const cargoVolumeCapacity = trip.cargoVolumeCapacity
      const cargoWeightCapacity = trip.cargoWeightCapacity

      let cargoItemWeight = 0.0;
      let cargoItemVolume = 0;

      if(!createTripTicketInput.cargoId && !createTripTicketInput.personId)
      {
        return new ValidationError(`Either a Person or Cargo must is required for a ticket`)
      }


      if(createTripTicketInput.personId)
      {
        if(trip.peopleCount >= trip.peopleCapacity)
        {
          return new ValidationError(`Trip is fully booked. You may signup for the 
          waitlist for any existing tickets which maybe cancelled`)
        }
      }
      if(createTripTicketInput.cargoId)
      {
        const cargo = await this.prisma.cargo.findUnique({
          where: { id: createTripTicketInput.cargoId },
          include: { cargoDimensionCategory: true }
        })
  
        cargoItemWeight = cargo.cargoWeight;
        cargoItemVolume = cargo.cargoDimensionCategory.unitsOfSpace;
  
        if( 
          (totalCargoWeight + cargoItemWeight) > cargoWeightCapacity
          || (totalCargoVolume + cargoItemVolume) > cargoVolumeCapacity
        )
        {
          return new ValidationError("Cargo Capacity Exceeded")
        }
      }

      const createdTripTicket = await this.prisma.tripTicket.create({
         data: {
          ...createTripTicketInput,
          statusId: 1,
          createdById: 1,
          createdAt: dayjs().toDate(),
          modifiedById: 1,
          modifiedAt: dayjs().toDate(),
        }
      })

      await this.prisma.trip.update({
        where: { id: trip.id },
        data: {
          cargoVolume: trip.cargoVolume + cargoItemVolume,
          cargoWeight: trip.cargoWeight + cargoItemWeight,
          peopleCount: (
            createTripTicketInput.personId 
            ? trip.peopleCount + 1
            : trip.peopleCount
          ) 
        }
      })


      return createdTripTicket;
    }
    catch(error)
    {
      throw new ApolloError(error)
    }
  }

  async findAll() {
    return await this.prisma.tripTicket.findMany({
      include: { 
        ...this.includes
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.tripTicket.findUnique({ 
      where: { id },
      include: { 
        ...this.includes,
      }
    })
  }

  // async update(id: number, updateTripTicketInput: UpdateTripTicketInput) {
  //   const {id: entityId, cargoListIds, ...entityDataUpdated} = updateTripTicketInput;
  //   const entity = await this.prisma.tripTicket.findUnique({ where: { id } })
  //   await this.prisma.tripTicket.update({
  //     where: { id },
  //     data: { 
  //       ...entity,
  //       ...entityDataUpdated,
  //       cargoList: 
  //         Array.isArray(cargoListIds)
  //         ? { set: cargoListIds.map(x => ({id: x}))}
  //         : {},
  //       // cargoList: { set: cargoListIds?.map(x => ({id: x})) ?? []},
  //       modifiedById: (Math.floor(Math.random() * 6) + 2),
  //       modifiedAt: dayjs().toDate()
  //     }
  //   })
  //   return await this.prisma.tripTicket.findUnique({ 
  //     where: { id } ,
  //     include: { 
  //       ...this.includes
  //     }
  //   });
  // }

  async updateStatus(id: number, entityStatusId: number) {
    // const entity = await this.prisma.tripTicket.findUnique({ where: { id } })
    const randModifiedById = (Math.floor(Math.random() * 6) + 2)
    await this.prisma.tripTicket.update({
      where: { id },
      data: { 
        // ...entity,
        statusId: entityStatusId,
        modifiedById: randModifiedById,
        modifiedAt: dayjs().toDate()
      }
    })

    await this.prisma.tripTicket.updateMany({
      where: { dependentTripId: id },
      data:
      {
        statusId: entityStatusId,
      }
    })

    return await this.prisma.tripTicket.findUnique({ 
      where: { id } ,
      include: { 
        ...this.includes
      }
    });
  }

}
