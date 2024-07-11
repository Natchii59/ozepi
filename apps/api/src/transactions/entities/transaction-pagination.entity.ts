import { ObjectType } from '@nestjs/graphql'

@ObjectType({
  description:
    'The TransactionPagination object represents a paginated list of transactions within the application.'
})
export class TransactionPagination {}
