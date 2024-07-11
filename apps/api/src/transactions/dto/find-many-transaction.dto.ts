import { ArgsType, Field, InputType, Int } from '@nestjs/graphql'
import { Transform } from 'class-transformer'

import {
  DateTimeFilter,
  FloatFilter,
  SortOrder,
  StringFilter
} from '@/common/dto/prisma.dto'
import { EnumTransactionTypeFilter } from '@/common/dto/transaction-type.dto'

@InputType({
  description:
    'The transaction where input object represents the criteria for filtering transactions.'
})
export class TransactionWhereInput {
  @Field(() => [TransactionWhereInput], {
    nullable: true,
    description:
      'A list of conditions that must all be true (logical AND) for the transaction to be included in the results.'
  })
  AND?: TransactionWhereInput[]

  @Field(() => [TransactionWhereInput], {
    nullable: true,
    description:
      'A list of conditions where at least one must be true (logical OR) for the transaction to be included in the results.'
  })
  OR?: TransactionWhereInput[]

  @Field(() => [TransactionWhereInput], {
    nullable: true,
    description:
      'A list of conditions that must all be false (logical NOT) for the transaction to be included in the results.'
  })
  NOT?: TransactionWhereInput[]

  @Field(() => StringFilter, {
    nullable: true,
    description: 'A filter to apply to the transaction ID field.'
  })
  id?: StringFilter

  @Field(() => StringFilter, {
    nullable: true,
    description: 'A filter to apply to the transaction title field.'
  })
  title?: StringFilter

  @Field(() => FloatFilter, {
    nullable: true,
    description: 'A filter to apply to the transaction amount field.'
  })
  amount?: FloatFilter

  @Field(() => DateTimeFilter, {
    nullable: true,
    description: 'A filter to apply to the transaction date field.'
  })
  date?: DateTimeFilter

  @Field(() => EnumTransactionTypeFilter, {
    nullable: true,
    description: 'A filter to apply to the transaction type field.'
  })
  type?: EnumTransactionTypeFilter

  @Field(() => DateTimeFilter, {
    nullable: true,
    description:
      'A filter to apply to the createdAt field, filtering by the date and time the transaction was created.'
  })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, {
    nullable: true,
    description:
      'A filter to apply to the updatedAt field, filtering by the date and time the transaction was last updated.'
  })
  updatedAt?: DateTimeFilter

  @Field(() => StringFilter, {
    nullable: true,
    description: 'A filter to apply to the wallet ID field.'
  })
  walletId?: StringFilter
}

@InputType()
export class TransactionOrderByInput {
  @Field(() => SortOrder, {
    nullable: true,
    description: 'The direction in which to sort the fetched transactions.'
  })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description:
      'The order in which to sort the fetched transactions by their title.'
  })
  title?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description:
      'The order in which to sort the fetched transactions by their amount.'
  })
  amount?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description:
      'The order in which to sort the fetched transactions by their date.'
  })
  date?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description:
      'The order in which to sort the fetched transactions by their type.'
  })
  type?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description:
      'The order in which to sort the fetched transactions by the date and time they were created.'
  })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description:
      'The order in which to sort the fetched transactions by the date and time they were last updated.'
  })
  updatedAt?: keyof typeof SortOrder
}

@ArgsType()
export class FindManyTransactionArgs {
  @Field(() => TransactionWhereInput, {
    nullable: true,
    description: 'Filter criteria to determine which transactions to fetch.'
  })
  @Transform(({ value }: { value?: TransactionWhereInput | null }) =>
    value === null ? undefined : value
  )
  where?: TransactionWhereInput

  @Field(() => [TransactionOrderByInput], {
    nullable: true,
    description: 'The order in which to sort the fetched transactions.'
  })
  @Transform(({ value }: { value?: TransactionOrderByInput | null }) =>
    value === null ? undefined : value
  )
  orderBy?: TransactionOrderByInput[]

  @Field(() => Int, {
    nullable: true,
    description:
      'The number of transactions to fetch. If not specified, all matcing transactions will be fetched.'
  })
  @Transform(({ value }: { value?: number | null }) =>
    value === null ? undefined : value
  )
  take?: number

  @Field(() => Int, {
    nullable: true,
    description:
      'The number of transactions to skip before starting to collect the result set.'
  })
  @Transform(({ value }: { value?: number | null }) =>
    value === null ? undefined : value
  )
  skip?: number
}
