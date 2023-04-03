import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { PersonModule } from './person/person.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/schema.graphql',
    }),
    LocationModule,
    PersonModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
