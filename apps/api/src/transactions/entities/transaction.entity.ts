import { Field, Float, ObjectType } from '@nestjs/graphql'
import { Transaction as PrismaTransaction } from '@prisma/client'
import { GraphQLCuid } from 'graphql-scalars'

import { TransactionType } from '@/common/dto/transaction-type.dto'

@ObjectType({
  description:
    'The Transaction object represents a registered transaction within the application.'
})
export class Transaction implements Partial<PrismaTransaction> {
  @Field(() => GraphQLCuid, {
    description:
      'The unique identifier (ID) of the transaction. This is a unique string assigned to each transaction upon creation and is used for transaction identification within the application.'
  })
  id: string

  @Field(() => String, {
    description:
      'The title of the transaction. This field is used to describe the purpose of the transaction.'
  })
  title: string

  @Field(() => Float, {
    description:
      'The amount of the transaction. This field represents the monetary value of the transaction.'
  })
  amount: number

  @Field(() => Date, {
    description:
      'The date of the transaction. This field records the exact date when the transaction occurred.'
  })
  date: Date

  @Field(() => TransactionType, {
    description:
      'The type of the transaction. This field categorizes the transaction as either an income or an expense.'
  })
  type: keyof typeof TransactionType

  @Field(() => GraphQLCuid, {
    description:
      'The unique identifier (ID) of the wallet associated with the transaction. This is a unique string assigned to each wallet upon creation and is used for wallet identification within the application.'
  })
  walletId: string

  @Field(() => Date, {
    description:
      'The creation timestamp of the transaction. This field records the exact date and time when the transaction was created.'
  })
  createdAt: Date

  @Field(() => Date, {
    description:
      "The last update timestamp of the transaction. This field records the most recent date and time when the transaction's information was modified."
  })
  updatedAt: Date
}
