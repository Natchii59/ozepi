import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
  IsEmail,
  IsOptional,
  IsStrongPassword,
  Length,
  ValidateIf,
  ValidateNested
} from 'class-validator'

@InputType({
  description:
    'Defines the data required to update an existing user within the application.'
})
export class UpdateUserInput {
  @Field(() => String, {
    nullable: true,
    description:
      'The email of the user. This field must contain a valid email address and be unique within the user table. It is optional and will only be validated if provided.'
  })
  @IsEmail(undefined, {
    message: 'The email field must be a valid email address'
  })
  @ValidateIf((_, value) => value !== undefined)
  email?: string

  @Field(() => String, {
    nullable: true,
    description:
      'The password of the user. This field must be at least 12 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character. It is optional and will only be validated if provided.'
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
  @ValidateIf((_, value) => value !== undefined)
  password?: string

  @Field(() => String, {
    nullable: true,
    description:
      'The name of the user. This field must be between 3 and 255 characters long. It is optional and can be null.'
  })
  @Length(3, 255, {
    message: 'The name field must be between 3 and 255 characters',
    context: { min: 3, max: 255 }
  })
  @IsOptional()
  name?: string | null
}

@ArgsType()
export class UpdateUserArgs {
  @Field(() => UpdateUserInput, {
    description: 'The data required to update an existing user.'
  })
  @Type(() => UpdateUserInput)
  @ValidateNested()
  input: UpdateUserInput
}
