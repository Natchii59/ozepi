import { UseGuards } from '@nestjs/common'
import { Int, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { ParentArgs } from '@/common/decorators/parent-args.decorator'
import { FindManyTransactionArgs } from '../dto/find-many-transaction.dto'
import { TransactionPagination } from '../entities/transaction-pagination.entity'
import { Transaction } from '../entities/transaction.entity'
import { TransactionsService } from '../transactions.service'

@Resolver(() => TransactionPagination)
export class TransactionPaginationFieldsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => [Transaction], {
    description:
      'Retrieve a list of transactions within the application. This field returns an array of transactions based on the provided query arguments.'
  })
  nodes(
    @ParentArgs(FindManyTransactionArgs) args: FindManyTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<Transaction[]> {
    return this.transactionsService.findMany(currentUser.id, args)
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => Int, {
    description:
      'Retrieve the total count of transactions within the application. This field returns the total number of transactions based on the provided query arguments.'
  })
  totalCount(
    @ParentArgs(FindManyTransactionArgs) args: FindManyTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<number> {
    return this.transactionsService.count(currentUser.id, args.where)
  }
}
