import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor() {}

  @Query(() => User)
  getUser(@Args('id') id: number): User {
    return { id: 1, name: 'jack' };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): User {
    return { id: 1, name: 'jack' };
  }
}
