import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'nestjs-prisma'

import { HashService } from '@/common/hash/hash.service'

import type { LoginInput } from './dto/login.dto'
import type { Tokens } from './entities/tokens.entity'
import type { JwtPayload } from './types/auth'
import type { SecurityConfig } from '@/common/config/config.interface'
import type { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService
  ) {}

  async login(input: LoginInput): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email }
    })

    const isPasswordValid = await this.hashService.validate(
      input.password,
      user?.password
    )

    if (!user || !isPasswordValid)
      throw new UnauthorizedException('Invalid credentials')

    return this.generateTokens({ userId: user.id })
  }

  generateTokens(payload: JwtPayload): Tokens {
    const accessToken = this.generateAccessToken(payload)
    const refreshToken = this.generateRefreshToken(payload)

    return {
      accessToken,
      refreshToken
    }
  }

  refreshTokens(refreshToken: string): Tokens {
    try {
      const { userId } = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET')
      })

      return this.generateTokens({ userId })
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  validateUser(payload: JwtPayload): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: payload.userId
      }
    })
  }

  private generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload)
  }

  private generateRefreshToken(payload: JwtPayload): string {
    const securityConfig =
      this.configService.getOrThrow<SecurityConfig>('security')

    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn
    })
  }
}
