import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { HashService } from '@/common/hash/hash.service'
import { ValidationErrorMessage } from '@/common/utils/validation-errors'

import type { Prisma, User } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService
  ) {}

  async create(input: Prisma.UserCreateInput): Promise<User> {
    await this.verifyUniqueFields(input)

    const hashedPassword = await this.hashService.hash(input.password)

    return this.prisma.user.create({
      data: {
        ...input,
        password: hashedPassword
      }
    })
  }

  findUnique(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where })
  }

  async update(id: string, input: Prisma.UserUpdateInput): Promise<User> {
    await this.verifyUniqueFields({ email: input.email?.toString() }, id)

    const hashedPassword =
      typeof input.password === 'string'
        ? await this.hashService.hash(input.password)
        : undefined

    return this.prisma.user.update({
      where: { id },
      data: {
        ...input,
        password: hashedPassword
      }
    })
  }

  delete(userId: string): Promise<User> {
    return this.prisma.user.delete({ where: { id: userId } })
  }

  async verifyUniqueFields(
    input: Partial<Pick<User, 'email'>>,
    userId?: string
  ): Promise<void> {
    const messages: ValidationErrorMessage[] = []

    if (input.email) {
      const result = await this.prisma.user.findFirst({
        where: { email: input.email, id: { not: userId } }
      })

      if (result) {
        messages.push({
          field: 'email',
          message: 'The email field is already taken',
          rule: 'isUnique',
          meta: { table: 'user' }
        })
      }
    }

    if (messages.length > 0) {
      throw new ConflictException(messages)
    }
  }
}
