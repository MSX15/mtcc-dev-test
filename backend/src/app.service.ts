import { Injectable } from '@nestjs/common';
import { Prisma, Status } from '@prisma/client'




@Injectable()
export class AppService {


  getHello(): string {
    return 'Hello World!';
  }

  getTickets(): [string] {
    return ['Ticket 1'];
  }

  // async getStatuses(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.StatusWhereUniqueInput;
  //   where?: Prisma.StatusWhereInput;
  //   orderBy?: Prisma.StatusOrderByWithRelationInput;
  // }): Promise<Status[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.status.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }
}