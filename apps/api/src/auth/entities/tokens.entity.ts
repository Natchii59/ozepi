import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJWT } from 'graphql-scalars'

@ObjectType({
  description: 'The Tokens object represents the access and refresh tokens.'
})
export class Tokens {
  @Field(() => GraphQLJWT, {
    description: 'The access token used to authenticate requests.'
  })
  accessToken: string

  @Field(() => GraphQLJWT, {
    description: 'The refresh token used to generate a new access token.'
  })
  refreshToken: string
}
