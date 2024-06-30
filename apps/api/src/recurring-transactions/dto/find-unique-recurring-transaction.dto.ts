import { ArgsType, Field } from '@nestjs/graphql'
import { GraphQLCuid } from 'graphql-scalars'

@ArgsType()
export class FindUniqueRecurringTransactionArgs {
  @Field(() => GraphQLCuid, {
    description: 'The ID of the recurring transaction to retrieve.'
  })
  id: string
}
