import { ObjectType } from '@nestjs/graphql'

@ObjectType({
  description:
    'The WalletPagination object represents a paginated list of wallets within the application.'
})
export class WalletPagination {}
