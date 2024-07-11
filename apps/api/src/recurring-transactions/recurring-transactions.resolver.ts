import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { CreateRecurringTransactionArgs } from './dto/create-recurring-transaction.dto'
import { DeleteRecurringTransactionArgs } from './dto/delete-recurring-transaction.dto'
import { FindManyRecurringTransactionArgs } from './dto/find-many-recurring-transaction.dto'
import { FindUniqueRecurringTransactionArgs } from './dto/find-unique-recurring-transaction.dto'
import { RecurringTransactionPagination } from './entities/recurring-transaction-pagination.entity'
import { RecurringTransaction } from './entities/recurring-transaction.entity'
import { RecurringTransactionsService } from './recurring-transactions.service'

@Resolver()
export class RecurringTransactionsResolver {
  constructor(
    private readonly recurringTransactionsService: RecurringTransactionsService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => RecurringTransaction)
  createRecurringTransaction(
    @Args() args: CreateRecurringTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<RecurringTransaction> {
    return this.recurringTransactionsService.create(args.input, currentUser.id)
  }

  @Mutation(() => RecurringTransaction)
  @UseGuards(GqlAuthGuard)
  deleteRecurringTransaction(
    @Args() args: DeleteRecurringTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<RecurringTransaction> {
    return this.recurringTransactionsService.delete(args.id, currentUser.id)
  }

  @Query(() => RecurringTransaction, {
    nullable: true,
    name: 'recurringTransaction'
  })
  @UseGuards(GqlAuthGuard)
  findUniqueRecurringTransaction(
    @Args() args: FindUniqueRecurringTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<RecurringTransaction | null> {
    return this.recurringTransactionsService.findUnique(args, currentUser.id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => RecurringTransactionPagination, {
    name: 'recurringTransactions'
  })
  findManyRecurringTransactions(
    @Args() _args: FindManyRecurringTransactionArgs
  ): boolean {
    return true
  }
}
