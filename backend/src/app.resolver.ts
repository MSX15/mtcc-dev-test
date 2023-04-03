import { Resolver, Query } from '@nestjs/graphql';
import { Prisma, Status } from '@prisma/client'
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  helloWorld(): string {
    return this.appService.getHello();
  }

  @Query(() => [String])
  tickets(): [string] {
    return this.appService.getTickets();
  }

  // @Query(() => [])
  // async statuses(): Promise<Status[]> {
  //   return (await this.appService.getStatuses({}));
  // }
}

