import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ShankhnaadModule } from '@db/shankhnaad-gen';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
    }),
    ShankhnaadModule,
  ],
  providers: [],
})
export class AppModule {}
