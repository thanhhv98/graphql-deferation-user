import { Args, ID, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) { }

  @Query((returns) => User, { name: 'user' })
  async getUser(@Args({ name: 'id', type: () => ID }) id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Mutation(returns => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    const user = await this.usersService.createUser(createUserInput);
    return user;
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<User> {
    return await this.usersService.findById(reference.id);
  }
}