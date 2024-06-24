import { UseGuards } from '@nestjs/common'
import { Int, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { ParentArgs } from '@/common/decorators/parent-args.decorator'
import { FindManyWalletArgs } from '../dto/find-many-wallet.dto'
import { WalletPagination } from '../entities/wallet-pagination.entity'
import { Wallet } from '../entities/wallet.entity'
import { WalletsService } from '../wallets.service'

@Resolver(() => WalletPagination)
export class WalletPaginationFieldsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => [Wallet], {
    description:
      'Retrieve a list of wallets within the application. This field returns an array of wallets based on the provided query arguments.'
  })
  nodes(
    @ParentArgs(FindManyWalletArgs) args: FindManyWalletArgs,
    @CurrentUser() currentUser: User
  ): Promise<Wallet[]> {
    return this.walletsService.findMany(currentUser.id, args)
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => Int, {
    description:
      'Retrieve the total count of wallets within the application. This field returns the total number of wallets based on the provided query arguments.'
  })
  totalCount(
    @ParentArgs(FindManyWalletArgs) args: FindManyWalletArgs,
    @CurrentUser() currentUser: User
  ): Promise<number> {
    return this.walletsService.count(currentUser.id, args.where)
  }
}
