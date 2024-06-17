import { Module } from '@nestjs/common'

import { CommonModule } from '@/common/common.module'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [CommonModule],
  providers: [UsersService, UsersResolver]
})
export class UsersModule {}
