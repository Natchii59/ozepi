import { ArgsType, Field } from '@nestjs/graphql'
import { GraphQLCuid } from 'graphql-scalars'

@ArgsType()
export class FindUniqueTransactionArgs {
  @Field(() => GraphQLCuid, {
    description: 'The ID of the transaction to retrieve.'
  })
  id: string
}
