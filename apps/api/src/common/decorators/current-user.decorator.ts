import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import type { ExecutionContext } from '@nestjs/common'
import type { GqlContext } from 'types/graphql'

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)

    return ctx.getContext<GqlContext>().req.user
  }
)
