import { BadRequestException, ValidationPipe } from '@nestjs/common'

import { formatValidationErrors } from './common/utils/validation-errors'

import type { INestApplication } from '@nestjs/common'

export function configureApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        const messages = formatValidationErrors(errors)
        return new BadRequestException(messages)
      }
    })
  )
}
