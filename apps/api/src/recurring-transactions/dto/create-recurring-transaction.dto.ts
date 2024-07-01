import { ArgsType, Field, InputType, Int } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { Max, Min, ValidateIf, ValidateNested } from 'class-validator'
import { GraphQLCuid } from 'graphql-scalars'

import { Frequency } from '@/common/dto/frequency.dto'
import { TransactionType } from '@/common/dto/transaction-type.dto'

@InputType()
export class CreateRecurringTransactionInput {
  @Field(() => String)
  title: string

  @Field(() => Number)
  amount: number

  @Field(() => TransactionType)
  type: keyof typeof TransactionType

  @Field(() => Frequency)
  frequency: Frequency

  @Field(() => Int, {
    nullable: true
  })
  @Min(0, {
    message: 'Day of week must be between 0 and 6',
    context: { min: 0, max: 6 }
  })
  @Max(6, {
    message: 'Day of week must be between 0 and 6',
    context: { min: 0, max: 6 }
  })
  @ValidateIf(
    (o: CreateRecurringTransactionInput) => o.frequency === Frequency.WEEKLY
  )
  dayOfWeek?: number

  @Field(() => Int, {
    nullable: true
  })
  @Min(1, {
    message: 'Day of month must be between 1 and 31',
    context: { min: 1, max: 31 }
  })
  @Max(31, {
    message: 'Day of month must be between 1 and 31',
    context: { min: 1, max: 31 }
  })
  @ValidateIf(
    (o: CreateRecurringTransactionInput) =>
      o.frequency === Frequency.MONTHLY || o.frequency === Frequency.YEARLY
  )
  dayOfMonth?: number

  @Field(() => Int, {
    nullable: true
  })
  @Min(1, {
    message: 'Month must be between 1 and 12',
    context: { min: 1, max: 12 }
  })
  @Max(12, {
    message: 'Month must be between 1 and 12',
    context: { min: 1, max: 12 }
  })
  @ValidateIf(
    (o: CreateRecurringTransactionInput) => o.frequency === Frequency.YEARLY
  )
  month?: number

  @Field(() => GraphQLCuid)
  walletId: string
}

@ArgsType()
export class CreateRecurringTransactionArgs {
  @Field(() => CreateRecurringTransactionInput, {
    description: 'The data required to create a new recurring transaction.'
  })
  @Type(() => CreateRecurringTransactionInput)
  @ValidateNested()
  input: CreateRecurringTransactionInput
}
