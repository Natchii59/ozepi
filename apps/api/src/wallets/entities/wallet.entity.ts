import { Field, Float, ObjectType } from '@nestjs/graphql'
import { Wallet as PrismaWallet } from '@prisma/client'
import { GraphQLCuid } from 'graphql-scalars'

import { Currencies } from '@/common/dto/currencies.dto'

@ObjectType({
  description:
    'The Wallet object represents a registered wallet within the application.'
})
export class Wallet implements Partial<PrismaWallet> {
  @Field(() => GraphQLCuid, {
    description:
      'The unique identifier (ID) of the wallet. This is a unique string assigned to each wallet upon creation and is used for wallet identification within the application.'
  })
  id: string

  @Field(() => String, {
    description:
      'The name of the wallet. This field must be unique within the wallet table.'
  })
  name: string

  @Field(() => Currencies, {
    description: 'The currency that the wallet will use.'
  })
  currency: keyof typeof Currencies

  @Field(() => Float, {
    description: 'The currency that the wallet will use.'
  })
  currentBalance: number

  @Field(() => Date, {
    description:
      'The creation timestamp of the wallet. This field records the exact date and time when the wallet was created.'
  })
  createdAt: Date

  @Field(() => Date, {
    description:
      "The last update timestamp of the wallet. This field records the most recent date and time when the wallet's information was modified."
  })
  updatedAt: Date

  @Field(() => GraphQLCuid, {
    description:
      'The unique identifier (ID) of the user who owns the wallet. This is a unique string assigned to each user upon registration and is used for user identification within the application.'
  })
  userId: string
}
