import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from './auth.service'
import { LoginArgs } from './dto/login.dto'
import { RefreshTokensArgs } from './dto/refresh-tokens.dto'
import { Tokens } from './entities/tokens.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Tokens, {
    nullable: true,
    description:
      'Authenticate a user using their credentials and return access and refresh tokens.'
  })
  login(@Args() args: LoginArgs): Promise<Tokens> {
    return this.authService.login(args.input)
  }

  @Mutation(() => Tokens, {
    nullable: true,
    description:
      'Generate and return a new set of access and refresh tokens using a valid refresh token.'
  })
  refreshTokens(@Args() args: RefreshTokensArgs): Tokens {
    return this.authService.refreshTokens(args.refreshToken)
  }
}
