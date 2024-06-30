import { ObjectType } from '@nestjs/graphql'

@ObjectType({
  description:
    'The RecurringTransactionPagination object represents a paginated list of recurring transactions within the application.'
})
export class RecurringTransactionPagination {}
