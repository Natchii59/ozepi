import { ArgsType, Field } from '@nestjs/graphql'
import { GraphQLCuid } from 'graphql-scalars'

@ArgsType()
export class DeleteRecurringTransactionArgs {
  @Field(() => GraphQLCuid, {
    description: 'The ID of the recurring transaction to delete.'
  })
  id: string
}
