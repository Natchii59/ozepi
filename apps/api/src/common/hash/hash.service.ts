import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { compare, hash } from 'bcrypt'

import type { SecurityConfig } from '../config/config.interface'

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  get bcryptSaltRounds(): number {
    const securityConfig =
      this.configService.getOrThrow<SecurityConfig>('security')
    return securityConfig.bcryptSaltOrRound
  }

  hash(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds)
  }

  validate(password: string, hashedPassword?: string): Promise<boolean> {
    return compare(password, hashedPassword ?? '')
  }
}
