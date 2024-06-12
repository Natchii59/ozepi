import { Module } from '@nestjs/common'

import { HashService } from './hash/hash.service'

@Module({
  providers: [HashService],
  exports: [HashService]
})
export class CommonModule {}
