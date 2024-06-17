import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { CommonModule } from '@/common/common.module'
import { SecurityConfig } from '@/common/config/config.interface'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const security = configService.getOrThrow<SecurityConfig>('security')

        return {
          secret: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: security.expiresIn
          }
        }
      }
    }),
    CommonModule
  ],
  providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule {}
