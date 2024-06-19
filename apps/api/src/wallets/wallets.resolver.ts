import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { CreateWalletArgs } from './dto/create-wallet.dto'
import { DeleteWalletArgs } from './dto/delete-wallet.dto'
import { FindManyWalletArgs } from './dto/find-many-wallet.dto'
import { FindUniqueWalletArgs } from './dto/find-unique-wallet.dto'
import { UpdateWalletArgs } from './dto/update-wallet.dto'
import { WalletPagination } from './entities/wallet-pagination.entity'
import { Wallet } from './entities/wallet.entity'
import { WalletsService } from './wallets.service'

@Resolver()
export class WalletsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Wallet, {
    nullable: true,
    description: 'Creates a new wallet for the authenticated user.'
  })
  async createWallet(
    @Args() args: CreateWalletArgs,
    @CurrentUser() currentUser: User
  ): Promise<Wallet> {
    return this.walletsService.create({
      ...args.input,
      user: { connect: { id: currentUser.id } }
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Wallet, {
    nullable: true,
    description: 'Update an existing wallet of the authenticated user.'
  })
  async updateWallet(
    @Args() args: UpdateWalletArgs,
    @CurrentUser() currentUser: User
  ): Promise<Wallet> {
    return this.walletsService.update(args.id, currentUser.id, args.input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Wallet, {
    nullable: true,
    description: 'Delete an existing wallet of the authenticated user.'
  })
  async deleteWallet(
    @Args() args: DeleteWalletArgs,
    @CurrentUser() currentUser: User
  ): Promise<Wallet> {
    return this.walletsService.delete(args.id, currentUser.id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Wallet, {
    nullable: true,
    name: 'wallet',
    description: 'Retrieves a wallet by its ID of the authenticated user.'
  })
  async findUniqueWallet(
    @Args() args: FindUniqueWalletArgs,
    @CurrentUser() currentUser: User
  ): Promise<Wallet | null> {
    return this.walletsService.findUnique({ id: args.id }, currentUser.id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => WalletPagination, {
    name: 'wallets',
    description: 'Retrieves all wallets of the authenticated user.'
  })
  findManyWallet(@Args() _args: FindManyWalletArgs): boolean {
    return true
  }
}
