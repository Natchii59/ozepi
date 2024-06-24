/* eslint-disable @typescript-eslint/naming-convention -- If we want to use Prisma's naming convention for Enums, we need to disable this rule */
import { Field, Float, InputType, Int, registerEnumType } from '@nestjs/graphql'

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description:
    'Specifies the order of sorting: ascending (asc) or descending (desc).'
})

export enum NullsOrder {
  first = 'first',
  last = 'last'
}

registerEnumType(NullsOrder, {
  name: 'NullsOrder',
  description:
    'Defines how null values should be handled during sorting: first (nulls first) or last (nulls last).'
})

export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive'
}

registerEnumType(QueryMode, {
  name: 'QueryMode',
  description:
    'Defines the mode for filtering strings, either default or case-insensitive.'
})

@InputType({
  description:
    'Defines the criteria for sorting results based on string values.'
})
export class SortOrderInput {
  @Field(() => SortOrder, {
    description:
      'Specifies the order of sorting: ascending (asc) or descending (desc).'
  })
  sort: keyof typeof SortOrder

  @Field(() => NullsOrder, {
    nullable: true,
    description:
      'Defines how null values should be handled during sorting: first (nulls first) or last (nulls last).'
  })
  nulls?: keyof typeof NullsOrder
}

@InputType({
  description:
    'Defines the criteria for filtering results based on string values.'
})
export class StringFilter {
  @Field(() => String, {
    nullable: true,
    description:
      'Filters results to only include those that match this exact string.'
  })
  equals?: string;

  @Field(() => [String], {
    nullable: true,
    description:
      'Filters results to only include those that match any of the specified strings.'
  })
  in?: string[]

  @Field(() => [String], {
    nullable: true,
    description:
      'Filters results to exclude those that match any of the specified strings.'
  })
  notIn?: string[]

  @Field(() => String, {
    nullable: true,
    description:
      'Filters results to only include those that are less than the specified string.'
  })
  lt?: string

  @Field(() => String, {
    nullable: true,
    description:
      'Filters results to only include those that are less than or equal to the specified string.'
  })
  lte?: string

  @Field(() => String, {
    nullable: true,
    description:
      'Filters results to only include those that are greater than the specified string.'
  })
  gt?: string

  @Field(() => String, {
    nullable: true,
    description:
      'Filters results to only include those that are greater than or equal to the specified string.'
  })
  gte?: string

  @Field(() => String, {
    nullable: true,
    description:
      'Filters results to include those that contain the specified substring.'
  })
  contains?: string

  @Field(() => String, {
    nullable: true,
    description:
      'Filters results to include those that start with the specified string.'
  })
  startsWith?: string

  @Field(() => String, {
    nullable: true,
    description:
      'Filters results to include those that end with the specified string.'
  })
  endsWith?: string

  @Field(() => QueryMode, {
    nullable: true,
    description:
      'Defines the mode for filtering strings, either default or case-insensitive.'
  })
  mode?: keyof typeof QueryMode

  @Field(() => StringFilter, {
    nullable: true,
    description:
      'Allows for nested string filtering, applying additional filter criteria.'
  })
  not?: StringFilter
}

@InputType({
  description:
    'Defines the criteria for filtering results based on integer values.'
})
export class IntFilter {
  @Field(() => Int, {
    nullable: true,
    description:
      'Filters results to only include those that match this exact integer.'
  })
  equals?: number;

  @Field(() => [Int], {
    nullable: true,
    description:
      'Filters results to only include those that match any of the specified integers.'
  })
  in?: number[]

  @Field(() => [Int], {
    nullable: true,
    description:
      'Filters results to exclude those that match any of the specified integers.'
  })
  notIn?: number[]

  @Field(() => Int, {
    nullable: true,
    description:
      'Filters results to only include those that are less than the specified integer.'
  })
  lt?: number

  @Field(() => Int, {
    nullable: true,
    description:
      'Filters results to only include those that are less than or equal to the specified integer.'
  })
  lte?: number

  @Field(() => Int, {
    nullable: true,
    description:
      'Filters results to only include those that are greater than the specified integer.'
  })
  gt?: number

  @Field(() => Int, {
    nullable: true,
    description:
      'Filters results to only include those that are greater than or equal to the specified integer.'
  })
  gte?: number

  @Field(() => IntFilter, {
    nullable: true,
    description:
      'Allows for nested integer filtering, applying additional filter criteria.'
  })
  not?: IntFilter
}

@InputType({
  description:
    'Defines the criteria for filtering results based on floating-point values.'
})
export class DateTimeFilter {
  @Field(() => Date, {
    nullable: true,
    description:
      'Filters results to only include those that match this exact date or date string.'
  })
  equals?: Date | string;

  @Field(() => [Date], {
    nullable: true,
    description:
      'Filters results to only include those that match any of the specified dates or date strings.'
  })
  in?: Date[] | string[]

  @Field(() => [Date], {
    nullable: true,
    description:
      'Filters results to exclude those that match any of the specified dates or date strings.'
  })
  notIn?: Date[] | string[]

  @Field(() => Date, {
    nullable: true,
    description:
      'Filters results to only include those that are earlier than the specified date or date string.'
  })
  lt?: Date | string

  @Field(() => Date, {
    nullable: true,
    description:
      'Filters results to only include those that are earlier than or equal to the specified date or date string.'
  })
  lte?: Date | string

  @Field(() => Date, {
    nullable: true,
    description:
      'Filters results to only include those that are later than the specified date or date string.'
  })
  gt?: Date | string

  @Field(() => Date, {
    nullable: true,
    description:
      'Filters results to only include those that are later than or equal to the specified date or date string.'
  })
  gte?: Date | string

  @Field(() => DateTimeFilter, {
    nullable: true,
    description:
      'Allows for nested date filtering, applying additional filter criteria.'
  })
  not?: DateTimeFilter
}

@InputType({
  description:
    'Defines the criteria for filtering results based on boolean values.'
})
export class BoolFilter {
  @Field(() => Boolean, {
    nullable: true,
    description:
      'Filters results to only include those that match this exact boolean value.'
  })
  equals?: boolean

  @Field(() => BoolFilter, {
    nullable: true,
    description:
      'Allows for nested boolean filtering, applying additional filter criteria.'
  })
  not?: BoolFilter
}

@InputType()
export class FloatFilter {
  @Field(() => Float, {
    nullable: true,
    description:
      'Filters results to only include those that match this exact float.'
  })
  equals?: number;

  @Field(() => [Float], {
    nullable: true,
    description:
      'Filters results to only include those that match any of the specified floats.'
  })
  in?: number[]

  @Field(() => [Float], {
    nullable: true,
    description:
      'Filters results to exclude those that match any of the specified floats.'
  })
  notIn?: number[]

  @Field(() => Float, {
    nullable: true,
    description:
      'Filters results to only include those that are less than the specified float.'
  })
  lt?: number

  @Field(() => Float, {
    nullable: true,
    description:
      'Filters results to only include those that are less than or equal to the specified float.'
  })
  lte?: number

  @Field(() => Float, {
    nullable: true,
    description:
      'Filters results to only include those that are greater than the specified float.'
  })
  gt?: number

  @Field(() => Float, {
    nullable: true,
    description:
      'Filters results to only include those that are greater than or equal to the specified float.'
  })
  gte?: number

  @Field(() => FloatFilter, {
    nullable: true,
    description:
      'Allows for nested float filtering, applying additional filter criteria.'
  })
  not?: FloatFilter
}
