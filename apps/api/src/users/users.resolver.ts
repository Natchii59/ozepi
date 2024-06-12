import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { CreateUserArgs } from './dto/create-user.dto'
import { UpdateUserArgs } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, {
    nullable: true,
    description: 'Create a new user within the application.'
  })
  createUser(@Args() args: CreateUserArgs): Promise<User> {
    return this.usersService.create({
      email: args.input.email,
      password: args.input.password
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, {
    nullable: true,
    description:
      'Update the current user within the application. Requires authentication.'
  })
  async updateUser(
    @Args() args: UpdateUserArgs,
    @CurrentUser() user: User
  ): Promise<User | null> {
    return this.usersService.update(user.id, args.input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, {
    nullable: true,
    description:
      'Delete the current user within the application. Requires authentication.'
  })
  async deleteUser(@CurrentUser() user: User): Promise<User | null> {
    return this.usersService.delete(user.id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, {
    nullable: true,
    description:
      'Get the current user within the application. Requires authentication.'
  })
  me(@CurrentUser() user: User): User {
    return user
  }
}
