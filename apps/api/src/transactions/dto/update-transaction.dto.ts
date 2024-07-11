import { ArgsType, Field, Float, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
  IsDate,
  Min,
  MinLength,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { GraphQLCuid } from 'graphql-scalars'

@InputType({
  description:
    'Defines the data required to update an existing transaction within the application.'
})
export class UpdateTransactionInput {
  @Field(() => String, {
    nullable: true,
    description: 'The title of the transaction.'
  })
  @MinLength(3, {
    message: 'The title must be at least 3 characters long.',
    context: {
      min: 3
    }
  })
  @ValidateIf((_, value) => value !== undefined)
  title?: string

  @Field(() => Float, {
    nullable: true,
    description: 'The amount of the transaction.'
  })
  @Min(0, {
    message: 'The amount must be greater than or equal to 0.',
    context: {
      min: 0
    }
  })
  @ValidateIf((_, value) => value !== undefined)
  amount?: number

  @Field(() => Date, {
    nullable: true,
    description: 'The date of the transaction.'
  })
  @IsDate({
    message: 'The date must be a valid date.'
  })
  @ValidateIf((_, value) => value !== undefined)
  date?: Date
}

@ArgsType()
export class UpdateTransactionArgs {
  @Field(() => GraphQLCuid, {
    description: 'The ID of the transaction to update.'
  })
  id: string

  @Field(() => UpdateTransactionInput, {
    description: 'The data required to update an existing transaction.'
  })
  @Type(() => UpdateTransactionInput)
  @ValidateNested()
  input: UpdateTransactionInput
}
