import { ArgsType, Field } from '@nestjs/graphql'
import { GraphQLCuid } from 'graphql-scalars'

@ArgsType()
export class DeleteWalletArgs {
  @Field(() => GraphQLCuid, {
    description: 'The ID of the wallet to delete.'
  })
  id: string
}
