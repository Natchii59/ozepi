import { Module } from '@nestjs/common'

import { RecurringTransactionPaginationFieldsResolver } from './fields/recurring-transaction-pagination-fields.resolver'
import { RecurringTransactionsCronService } from './recurring-transactions-cron.service'
import { RecurringTransactionsResolver } from './recurring-transactions.resolver'
import { RecurringTransactionsService } from './recurring-transactions.service'

@Module({
  providers: [
    RecurringTransactionsService,
    RecurringTransactionsResolver,
    RecurringTransactionPaginationFieldsResolver,
    RecurringTransactionsCronService
  ]
})
export class RecurringTransactionsModule {}
