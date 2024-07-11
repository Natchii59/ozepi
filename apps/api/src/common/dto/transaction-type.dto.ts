import { Field, InputType, registerEnumType } from '@nestjs/graphql'

export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'The transaction type that can be used within the application.'
})

@InputType()
export class EnumTransactionTypeFilter {
  @Field(() => TransactionType, {
    nullable: true,
    description: 'Checks for equality with the specified value.'
  })
  equals?: keyof typeof TransactionType;

  @Field(() => [TransactionType], {
    nullable: true,
    description: 'Checks for equality with the specified values.'
  })
  in?: (keyof typeof TransactionType)[]

  @Field(() => [TransactionType], {
    nullable: true,
    description: 'Checks for inequality with the specified values.'
  })
  notIn?: (keyof typeof TransactionType)[]

  @Field(() => EnumTransactionTypeFilter, {
    nullable: true,
    description: 'Negates the specified condition.'
  })
  not?: EnumTransactionTypeFilter
}
