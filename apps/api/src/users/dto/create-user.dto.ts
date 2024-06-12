import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsEmail, IsStrongPassword, ValidateNested } from 'class-validator'

import { Match } from '@/common/decorators/match.decorator'

@InputType({
  description:
    'Defines the data required to create a new user within the application.'
})
export class CreateUserInput {
  @Field(() => String, {
    description:
      'The email of the user. This field must contain a valid email address and be unique within the user table.'
  })
  @IsEmail(undefined, {
    message: 'The email field must be a valid email address'
  })
  email: string

  @Field(() => String, {
    description:
      'The password of the user. This field must be at least 12 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
  })
  @IsStrongPassword(
    {
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    {
      message:
        'The password field must be at least 12 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    }
  )
  password: string

  @Field(() => String, {
    description:
      "The confirmation of the user's password. This field must match the password field."
  })
  @Match(CreateUserInput, o => o.password, {
    message: 'The password and password confirmation fields must match',
    context: { otherField: 'password' }
  })
  passwordConfirmation: string
}

@ArgsType()
export class CreateUserArgs {
  @Field(() => CreateUserInput, {
    description: 'The data required to create a new user.'
  })
  @Type(() => CreateUserInput)
  @ValidateNested()
  input: CreateUserInput
}
