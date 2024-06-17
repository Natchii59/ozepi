import { registerDecorator } from 'class-validator'

import { MatchConstraint } from '../constraints/match.constraint'

import type { ClassConstructor } from 'class-transformer'
import type { ValidationOptions } from 'class-validator'

export const Match = <T>(
  _type: ClassConstructor<T>,
  property: keyof T,
  validationOptions?: ValidationOptions
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint<T>
    })
  }
}
