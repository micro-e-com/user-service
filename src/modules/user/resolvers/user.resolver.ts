import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user-input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args('id') id: number): Promise<User> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users = await this.userService.get();

    return users;
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create({
      name: createUserInput.name,
      email: createUserInput.email,
    });
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<User> {
    return await this.userService.getById(reference.id);
  }
}
