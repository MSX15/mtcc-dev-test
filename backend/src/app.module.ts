import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { PersonModule } from './person/person.module';
import { CargoModule } from './cargo/cargo.module';
import { CargoDimensionCategoryModule } from './cargo-dimension-category/cargo-dimension-category.module';
import { TripRequestModule } from './trip-request/trip-request.module';
import { StatusModule } from './status/status.module';
import { TripModule } from './trip/trip.module';
import { TripTicketModule } from './trip-ticket/trip-ticket.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/schema.graphql',
    }),
    LocationModule,
    PersonModule,
    CargoModule,
    CargoDimensionCategoryModule,
    TripRequestModule,
    StatusModule,
    TripModule,
    TripTicketModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
