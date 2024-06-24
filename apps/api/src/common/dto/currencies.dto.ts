import { Field, InputType, registerEnumType } from '@nestjs/graphql'

export enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  RUB = 'RUB'
}

registerEnumType(Currencies, {
  name: 'Currencies',
  description:
    'The available currencies that can be used within the application.'
})

@InputType()
export class EnumCurrenciesFilter {
  @Field(() => Currencies, {
    nullable: true,
    description: 'Checks for equality with the specified value.'
  })
  equals?: keyof typeof Currencies;

  @Field(() => [Currencies], {
    nullable: true,
    description: 'Checks for equality with the specified values.'
  })
  in?: (keyof typeof Currencies)[]

  @Field(() => [Currencies], {
    nullable: true,
    description: 'Checks for inequality with the specified values.'
  })
  notIn?: (keyof typeof Currencies)[]

  @Field(() => EnumCurrenciesFilter, {
    nullable: true,
    description: 'Negates the specified condition.'
  })
  not?: EnumCurrenciesFilter
}
