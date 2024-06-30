import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { RecurringTransaction as PrismaRecurringTransaction } from '@prisma/client'
import { GraphQLCuid } from 'graphql-scalars'

import { Frequency } from '@/common/dto/frequency.dto'
import { TransactionType } from '@/common/dto/transaction-type.dto'

@ObjectType()
export class RecurringTransaction
  implements Partial<PrismaRecurringTransaction>
{
  @Field(() => GraphQLCuid)
  id: string

  @Field(() => String)
  title: string

  @Field(() => Float)
  amount: number

  @Field(() => TransactionType)
  type: keyof typeof TransactionType

  @Field(() => Frequency)
  frequency: keyof typeof Frequency

  @Field(() => Int, {
    nullable: true
  })
  dayOfWeek: number | null

  @Field(() => Int, {
    nullable: true
  })
  dayOfMonth: number | null

  @Field(() => Int, {
    nullable: true
  })
  month: number | null

  @Field(() => GraphQLCuid)
  walletId: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
