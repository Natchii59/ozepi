import { ArgsType, Field, InputType, Int } from '@nestjs/graphql'
import { Transform } from 'class-transformer'

import { EnumCurrenciesFilter } from '@/common/dto/currencies.dto'
import {
  DateTimeFilter,
  FloatFilter,
  SortOrder,
  StringFilter
} from '@/common/dto/prisma.dto'

@InputType({
  description:
    'The wallet where input object represents the criteria for filtering wallets.'
})
export class WalletWhereInput {
  @Field(() => [WalletWhereInput], {
    nullable: true,
    description:
      'A list of conditions that must all be true (logical AND) for the wallet to be included in the results.'
  })
  AND?: WalletWhereInput[]

  @Field(() => [WalletWhereInput], {
    nullable: true,
    description:
      'A list of conditions where at least one must be true (logical OR) for the wallet to be included in the results.'
  })
  OR?: WalletWhereInput[]

  @Field(() => [WalletWhereInput], {
    nullable: true,
    description:
      'A list of conditions that must all be false (logical NOT) for the wallet to be included in the results.'
  })
  NOT?: WalletWhereInput[]

  @Field(() => StringFilter, {
    nullable: true,
    description: 'A filter to apply to the wallet ID field.'
  })
  id?: StringFilter

  @Field(() => StringFilter, {
    nullable: true,
    description: 'A filter to apply to the wallet name field.'
  })
  name?: StringFilter

  @Field(() => EnumCurrenciesFilter, {
    nullable: true,
    description: 'A filter to apply to the wallet currency field.'
  })
  currency?: EnumCurrenciesFilter

  @Field(() => FloatFilter, {
    nullable: true,
    description: 'A filter to apply to the wallet current balance field.'
  })
  currentBalance?: FloatFilter

  @Field(() => DateTimeFilter, {
    nullable: true,
    description:
      'A filter to apply to the createdAt field, filtering by the date and time the wallet was created.'
  })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, {
    nullable: true,
    description:
      'A filter to apply to the updatedAt field, filtering by the date and time the wallet was last updated.'
  })
  updatedAt?: DateTimeFilter
}

@InputType({
  description:
    'The wallet order input object represents the criteria by which to sort wallets.'
})
export class WalletOrderByInput {
  @Field(() => SortOrder, {
    nullable: true,
    description: 'The order in which to sort the wallet by their ID.'
  })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description: 'The order in which to sort the wallet by their name.'
  })
  name?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description: 'The order in which to sort the wallet by their currency.'
  })
  currency?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description:
      'The order in which to sort the wallet by their current balance.'
  })
  currentBalance?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description:
      'The order in which to sort the wallet by the date and time they were created.'
  })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, {
    nullable: true,
    description:
      'The order in which to sort the wallet by the date and time they were last updated.'
  })
  updatedAt?: keyof typeof SortOrder
}

@ArgsType()
export class FindManyWalletArgs {
  @Field(() => WalletWhereInput, {
    nullable: true,
    description: 'Filter criteria to determine which wallets to fetch.'
  })
  @Transform(({ value }: { value?: WalletWhereInput | null }) =>
    value === null ? undefined : value
  )
  where?: WalletWhereInput

  @Field(() => [WalletOrderByInput], {
    nullable: true,
    description: 'The order in which to sort the fetched wallets.'
  })
  @Transform(({ value }: { value?: WalletOrderByInput | null }) =>
    value === null ? undefined : value
  )
  orderBy?: WalletOrderByInput[]

  @Field(() => Int, {
    nullable: true,
    description:
      'The number of wallets to fetch. If not specified, all matcing wallets will be fetched.'
  })
  @Transform(({ value }: { value?: number | null }) =>
    value === null ? undefined : value
  )
  take?: number

  @Field(() => Int, {
    nullable: true,
    description:
      'The number of wallets to skip before starting to collect the result set.'
  })
  @Transform(({ value }: { value?: number | null }) =>
    value === null ? undefined : value
  )
  skip?: number
}
