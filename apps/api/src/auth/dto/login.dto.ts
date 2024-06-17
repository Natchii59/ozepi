import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsEmail } from 'class-validator'

@InputType({
  description:
    'The login input object represents the data required to authenticate a user within the application.'
})
export class LoginInput {
  @Field(() => String, {
    description: 'The email of the user.'
  })
  @IsEmail(undefined, {
    message: 'The email field must be a valid email address'
  })
  email: string

  @Field(() => String, {
    description: 'The password of the user.'
  })
  password: string
}

@ArgsType()
export class LoginArgs {
  @Field(() => LoginInput, {
    description:
      'The data required to authenticate a user within the application.'
  })
  @Type(() => LoginInput)
  input: LoginInput
}
