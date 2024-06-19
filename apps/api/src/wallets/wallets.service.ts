import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Wallet } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

import { UpdateWalletInput } from './dto/update-wallet.dto'

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: Prisma.WalletCreateInput): Promise<Wallet> {
    return this.prisma.wallet.create({ data: input })
  }

  async findUnique(
    where: Prisma.WalletWhereUniqueInput,
    currentUserId: string
  ): Promise<Wallet | null> {
    return this.prisma.wallet.findUnique({
      where: {
        ...where,
        userId: currentUserId
      }
    })
  }

  async findMany(
    currentUserId: string,
    args?: Prisma.WalletFindManyArgs
  ): Promise<Wallet[]> {
    return this.prisma.wallet.findMany({
      ...args,
      where: {
        AND: [{ ...args?.where }, { userId: currentUserId }]
      }
    })
  }

  async count(
    currentUserId: string,
    where?: Prisma.WalletWhereInput
  ): Promise<number> {
    return this.prisma.wallet.count({
      where: {
        AND: [{ ...where }, { userId: currentUserId }]
      }
    })
  }

  async update(
    id: string,
    currentUserId: string,
    input: UpdateWalletInput
  ): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id, userId: currentUserId }
    })

    if (!wallet) throw new NotFoundException('Wallet not found')

    return this.prisma.wallet.update({
      where: { id },
      data: input
    })
  }

  async delete(id: string, currentUserId: string): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id, userId: currentUserId }
    })

    if (!wallet) throw new NotFoundException('Wallet not found')

    return this.prisma.wallet.delete({ where: { id } })
  }
}
