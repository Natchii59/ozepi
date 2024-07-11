import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, RecurringTransaction } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

import { Frequency } from '@/common/dto/frequency.dto'
import { CreateRecurringTransactionInput } from './dto/create-recurring-transaction.dto'

@Injectable()
export class RecurringTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    input: CreateRecurringTransactionInput,
    currentUserId: string
  ): Promise<RecurringTransaction> {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        id: input.walletId,
        userId: currentUserId
      }
    })

    if (!wallet) throw new NotFoundException('Wallet not found')

    switch (input.frequency) {
      case Frequency.DAILY:
        delete input.dayOfWeek
        delete input.dayOfMonth
        delete input.month
        break
      case Frequency.WEEKLY:
        delete input.dayOfMonth
        delete input.month
        break
      case Frequency.MONTHLY:
        delete input.dayOfWeek
        delete input.month
        break
      case Frequency.YEARLY:
        delete input.dayOfWeek
        break
    }

    return this.prisma.recurringTransaction.create({
      data: {
        ...input
      }
    })
  }

  async delete(
    id: string,
    currentUserId: string
  ): Promise<RecurringTransaction> {
    const recurringTransaction =
      await this.prisma.recurringTransaction.findFirst({
        where: { id, wallet: { userId: currentUserId } }
      })

    if (!recurringTransaction)
      throw new NotFoundException('Recurring transaction not found')

    return this.prisma.recurringTransaction.delete({
      where: { id }
    })
  }

  async findUnique(
    where: Prisma.RecurringTransactionWhereUniqueInput,
    currentUserId: string
  ): Promise<RecurringTransaction | null> {
    return this.prisma.recurringTransaction.findUnique({
      where: {
        ...where,
        wallet: { userId: currentUserId }
      }
    })
  }

  async findMany(
    currentUserId: string,
    args?: Prisma.RecurringTransactionFindManyArgs
  ): Promise<RecurringTransaction[]> {
    return this.prisma.recurringTransaction.findMany({
      ...args,
      where: {
        AND: [{ ...args?.where }, { wallet: { userId: currentUserId } }]
      }
    })
  }

  async count(
    currentUserId: string,
    where?: Prisma.RecurringTransactionWhereInput
  ): Promise<number> {
    return this.prisma.recurringTransaction.count({
      where: {
        AND: [{ ...where }, { wallet: { userId: currentUserId } }]
      }
    })
  }
}
