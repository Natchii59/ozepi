import { ArgsType, Field, Float, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { Min, MinLength, ValidateNested } from 'class-validator'
import { GraphQLCuid } from 'graphql-scalars'

import { TransactionType } from '@/common/dto/transaction-type.dto'

@InputType({
  description:
    'Defines the data required to create a new transaction within the application.'
})
export class CreateTransactionInput {
  @Field(() => String, {
    description: 'The title of the transaction.'
  })
  @MinLength(3, {
    message: 'The title must be at least 3 characters long.',
    context: {
      min: 3
    }
  })
  title: string

  @Field(() => Float, {
    description: 'The amount of the transaction.'
  })
  @Min(0, {
    message: 'The amount must be greater than or equal to 0.',
    context: {
      min: 0
    }
  })
  amount: number

  @Field(() => Date, {
    description: 'The date of the transaction.'
  })
  date: Date

  @Field(() => TransactionType, {
    description: 'The type of transaction.'
  })
  type: keyof typeof TransactionType

  @Field(() => GraphQLCuid, {
    description: 'The wallet ID that the transaction belongs to.'
  })
  walletId: string
}

@ArgsType()
export class CreateTransactionArgs {
  @Field(() => CreateTransactionInput, {
    description: 'The data required to create a new transaction.'
  })
  @Type(() => CreateTransactionInput)
  @ValidateNested()
  input: CreateTransactionInput
}
