import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ValidateIf, ValidateNested } from 'class-validator'
import { GraphQLCuid } from 'graphql-scalars'

@InputType({
  description:
    'Defines the data required to update an existing wallet within the application.'
})
export class UpdateWalletInput {
  @Field(() => String, {
    nullable: true,
    description:
      'The name of the wallet. This field must be unique within the wallet table. It is optional and will only be validated if provided.'
  })
  @ValidateIf((_, value) => value !== undefined)
  name?: string
}

@ArgsType()
export class UpdateWalletArgs {
  @Field(() => GraphQLCuid, {
    description: 'The ID of the wallet to update.'
  })
  id: string

  @Field(() => UpdateWalletInput, {
    description: 'The data required to update an existing wallet.'
  })
  @Type(() => UpdateWalletInput)
  @ValidateNested()
  input: UpdateWalletInput
}
