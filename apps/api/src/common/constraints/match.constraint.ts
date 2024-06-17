import { ValidatorConstraint } from 'class-validator'

import type {
  ValidationArguments,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'match' })
export class MatchConstraint<T> implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    const [key] = args.constraints as [keyof T]
    const object = args.object as T
    return object[key] === value
  }

  defaultMessage(args: ValidationArguments): string {
    const [propertyKey] = args.constraints as [keyof T]
    return `The ${propertyKey.toString()} and ${args.property} fields does not match`
  }
}
