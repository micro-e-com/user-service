import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [UsersResolver, UserService, PrismaService],
})
export class UserModule {}
