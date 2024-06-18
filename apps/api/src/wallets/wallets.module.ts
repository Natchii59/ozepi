import { Module } from '@nestjs/common'

import { WalletPaginationFieldsResolver } from './fields/wallet-pagination-fields.resolver'
import { WalletsResolver } from './wallets.resolver'
import { WalletsService } from './wallets.service'

@Module({
  providers: [WalletsService, WalletsResolver, WalletPaginationFieldsResolver]
})
export class WalletsModule {}
