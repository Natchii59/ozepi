import { ArgsType, Field, Float, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsNumber, ValidateIf, ValidateNested } from 'class-validator'

import { Currencies } from '@/common/dto/currencies.dto'

@InputType({
  description:
    'Defines the data required to create a new wallet within the application.'
})
export class CreateWalletInput {
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
    nullable: true,
    description: 'The balance of the wallet. Defaults to 0.'
  })
  @IsNumber()
  @ValidateIf((_, v) => v !== undefined)
  currentBalance?: number
}

@ArgsType()
export class CreateWalletArgs {
  @Field(() => CreateWalletInput, {
    description: 'The data required to create a new wallet.'
  })
  @Type(() => CreateWalletInput)
  @ValidateNested()
  input: CreateWalletInput
}
