import { Module } from '@nestjs/common'

import { TransactionPaginationFieldsResolver } from './fields/transaction-pagination-fields.resolver'
import { TransactionsResolver } from './transactions.resolver'
import { TransactionsService } from './transactions.service'

@Module({
  providers: [
    TransactionsService,
    TransactionsResolver,
    TransactionPaginationFieldsResolver
  ]
})
export class TransactionsModule {}
