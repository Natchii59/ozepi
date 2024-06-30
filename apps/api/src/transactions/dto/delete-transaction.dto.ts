import { ArgsType, Field } from '@nestjs/graphql'
import { GraphQLCuid } from 'graphql-scalars'

@ArgsType()
export class DeleteTransactionArgs {
  @Field(() => GraphQLCuid, {
    description: 'The ID of the transaction to delete.'
  })
  id: string
}
