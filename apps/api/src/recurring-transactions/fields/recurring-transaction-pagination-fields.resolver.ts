import { UseGuards } from '@nestjs/common'
import { Int, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { ParentArgs } from '@/common/decorators/parent-args.decorator'
import { FindManyRecurringTransactionArgs } from '../dto/find-many-recurring-transaction.dto'
import { RecurringTransactionPagination } from '../entities/recurring-transaction-pagination.entity'
import { RecurringTransaction } from '../entities/recurring-transaction.entity'
import { RecurringTransactionsService } from '../recurring-transactions.service'

@Resolver(() => RecurringTransactionPagination)
export class RecurringTransactionPaginationFieldsResolver {
  constructor(
    private readonly recurringTransactionsService: RecurringTransactionsService
  ) {}

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => [RecurringTransaction])
  nodes(
    @ParentArgs(FindManyRecurringTransactionArgs)
    args: FindManyRecurringTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<RecurringTransaction[]> {
    return this.recurringTransactionsService.findMany(currentUser.id, args)
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => Int)
  totalCount(
    @ParentArgs(FindManyRecurringTransactionArgs)
    args: FindManyRecurringTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<number> {
    return this.recurringTransactionsService.count(currentUser.id, args.where)
  }
}
