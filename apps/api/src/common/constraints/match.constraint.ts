import { ValidatorConstraint } from 'class-validator'

import type {
  ValidationArguments,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    const [fn] = args.constraints as ((o: unknown) => unknown)[]
    return fn(args.object) === value
  }

  defaultMessage(args: ValidationArguments): string {
    const [constraintProperty] = args.constraints as string[]
    return `${constraintProperty} and ${args.property} does not match`
  }
}
