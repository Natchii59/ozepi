import { Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import type { ExecutionContext } from '@nestjs/common'
import type { User } from '@prisma/client'
import type { GqlContext } from 'types/graphql'

@Injectable()
export class AppAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Express.Request {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext<GqlContext>().req
  }

  handleRequest<TUser = User>(_err: Error, user: TUser | null): TUser | null {
    if (!user) return null

    return user
  }
}
