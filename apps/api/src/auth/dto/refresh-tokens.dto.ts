import { ArgsType, Field } from '@nestjs/graphql'
import { GraphQLJWT } from 'graphql-scalars'

@ArgsType()
export class RefreshTokensArgs {
  @Field(() => GraphQLJWT, {
    description: 'The refresh token used to generate a new access token.'
  })
  refreshToken: string
}
