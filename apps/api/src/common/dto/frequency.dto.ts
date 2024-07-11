import { Field, InputType, registerEnumType } from '@nestjs/graphql'

export enum Frequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

registerEnumType(Frequency, {
  name: 'Frequency',
  description: 'The frequency that can be used within the application.'
})

@InputType()
export class EnumFrequencyFilter {
  @Field(() => Frequency, {
    nullable: true,
    description: 'Checks for equality with the specified value.'
  })
  equals?: keyof typeof Frequency;

  @Field(() => [Frequency], {
    nullable: true,
    description: 'Checks for equality with the specified values.'
  })
  in?: (keyof typeof Frequency)[]

  @Field(() => [Frequency], {
    nullable: true,
    description: 'Checks for inequality with the specified values.'
  })
  notIn?: (keyof typeof Frequency)[]

  @Field(() => EnumFrequencyFilter, {
    nullable: true,
    description: 'Negates the specified condition.'
  })
  not?: EnumFrequencyFilter
}
