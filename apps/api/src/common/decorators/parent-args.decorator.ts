import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { plainToInstance } from 'class-transformer'

import type { ExecutionContext } from '@nestjs/common'
import type { ClassConstructor } from 'class-transformer'

interface ContextInfo {
  variableValues: unknown
}

export const ParentArgs = createParamDecorator(
  (cls: ClassConstructor<unknown> | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const info = ctx.getInfo<ContextInfo>()

    if (cls) {
      return plainToInstance(cls, info.variableValues)
    }

    return info.variableValues
  }
)
