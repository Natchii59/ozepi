import { ArgsType, Field, InputType, Int } from '@nestjs/graphql'
import { Transform } from 'class-transformer'

import { EnumFrequencyFilter } from '@/common/dto/frequency.dto'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  SortOrder,
  SortOrderInput,
  StringFilter
} from '@/common/dto/prisma.dto'
import { EnumTransactionTypeFilter } from '@/common/dto/transaction-type.dto'

@InputType()
export class RecurringTransactionWhereInput {
  @Field(() => [RecurringTransactionWhereInput], { nullable: true })
  AND?: RecurringTransactionWhereInput[]

  @Field(() => [RecurringTransactionWhereInput], { nullable: true })
  OR?: RecurringTransactionWhereInput[]

  @Field(() => [RecurringTransactionWhereInput], { nullable: true })
  NOT?: RecurringTransactionWhereInput[]

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter

  @Field(() => FloatFilter, { nullable: true })
  amount?: FloatFilter

  @Field(() => EnumTransactionTypeFilter, { nullable: true })
  type?: EnumTransactionTypeFilter

  @Field(() => EnumFrequencyFilter, { nullable: true })
  frequency?: EnumFrequencyFilter

  @Field(() => IntFilter, { nullable: true })
  dayOfWeek?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  dayOfMonth?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  month?: IntFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter

  @Field(() => StringFilter, { nullable: true })
  walletId?: StringFilter
}

@InputType()
export class RecurringTransactionOrderByInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  amount?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  type?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  frequency?: keyof typeof SortOrder

  @Field(() => SortOrderInput, { nullable: true })
  dayOfWeek?: SortOrderInput

  @Field(() => SortOrderInput, { nullable: true })
  dayOfMonth?: SortOrderInput

  @Field(() => SortOrderInput, { nullable: true })
  month?: SortOrderInput

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  walletId?: keyof typeof SortOrder
}

@ArgsType()
export class FindManyRecurringTransactionArgs {
  @Field(() => RecurringTransactionWhereInput, { nullable: true })
  @Transform(({ value }: { value?: RecurringTransactionWhereInput | null }) =>
    value === null ? undefined : value
  )
  where?: RecurringTransactionWhereInput

  @Field(() => [RecurringTransactionOrderByInput], {
    nullable: true
  })
  @Transform(
    ({ value }: { value?: RecurringTransactionOrderByInput | null }) =>
      value === null ? undefined : value
  )
  orderBy?: RecurringTransactionOrderByInput[]

  @Field(() => Int, {
    nullable: true,
    description:
      'The number of recurring transactions to fetch. If not specified, all matcing recurring transactions will be fetched.'
  })
  @Transform(({ value }: { value?: number | null }) =>
    value === null ? undefined : value
  )
  take?: number

  @Field(() => Int, {
    nullable: true,
    description:
      'The number of recurring transactions to skip before starting to collect the result set.'
  })
  @Transform(({ value }: { value?: number | null }) =>
    value === null ? undefined : value
  )
  skip?: number
}
