import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { CreateTransactionArgs } from './dto/create-transaction.dto'
import { DeleteTransactionArgs } from './dto/delete-transaction.dto'
import { FindManyTransactionArgs } from './dto/find-many-transaction.dto'
import { FindUniqueTransactionArgs } from './dto/find-unique-transaction.dto'
import { UpdateTransactionArgs } from './dto/update-transaction.dto'
import { TransactionPagination } from './entities/transaction-pagination.entity'
import { Transaction } from './entities/transaction.entity'
import { TransactionsService } from './transactions.service'

@Resolver()
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Transaction, {
    description: 'Create a new transaction within the application.'
  })
  async createTransaction(
    @Args() args: CreateTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<Transaction> {
    return this.transactionsService.create(args.input, currentUser.id)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Transaction, {
    description: 'Update an existing transaction within the application.'
  })
  async updateTransaction(
    @Args() args: UpdateTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<Transaction> {
    return this.transactionsService.update(args.id, currentUser.id, args.input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Transaction, {
    description: 'Delete an existing transaction within the application.'
  })
  async deleteTransaction(
    @Args() args: DeleteTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<Transaction> {
    return this.transactionsService.delete(args.id, currentUser.id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Transaction, {
    nullable: true,
    name: 'transaction',
    description: 'Retrieve a single transaction within the application.'
  })
  async findUniqueTransaction(
    @Args() args: FindUniqueTransactionArgs,
    @CurrentUser() currentUser: User
  ): Promise<Transaction | null> {
    return this.transactionsService.findUnique({ id: args.id }, currentUser.id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => TransactionPagination, {
    nullable: true,
    name: 'transactions',
    description: 'Retrieve multiple transactions within the application.'
  })
  findManyTransactions(@Args() _args: FindManyTransactionArgs): boolean {
    return true
  }
}
