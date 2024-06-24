import { ArgsType, Field } from '@nestjs/graphql'
import { GraphQLCuid } from 'graphql-scalars'

@ArgsType()
export class FindUniqueWalletArgs {
  @Field(() => GraphQLCuid, {
    description: 'The ID of the wallet to retrieve.'
  })
  id: string
}
