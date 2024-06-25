import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Transaction } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

import { CreateTransactionInput } from './dto/create-transaction.dto'
import { UpdateTransactionInput } from './dto/update-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    input: CreateTransactionInput,
    currentUserId: string
  ): Promise<Transaction> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: input.walletId, userId: currentUserId }
    })

    if (!wallet) throw new NotFoundException('Wallet not found')

    const [transaction] = await this.prisma.$transaction([
      this.prisma.transaction.create({
        data: {
          title: input.title,
          amount: input.amount,
          date: input.date,
          type: input.type,
          walletId: input.walletId
        }
      }),
      this.prisma.wallet.update({
        where: { id: input.walletId },
        data: {
          currentBalance:
            input.type === 'INCOME'
              ? wallet.currentBalance + input.amount
              : wallet.currentBalance - input.amount
        }
      })
    ])

    return transaction
  }

  async update(
    id: string,
    currentUserId: string,
    input: UpdateTransactionInput
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id, wallet: { userId: currentUserId } },
      include: { wallet: true }
    })

    if (!transaction) throw new NotFoundException('Transaction not found')

    const difference =
      input.amount !== undefined ? input.amount - transaction.amount : 0
    const newCurrentBalance = transaction.wallet.currentBalance + difference

    const [updatedTransaction] = await this.prisma.$transaction([
      this.prisma.transaction.update({
        where: { id },
        data: input
      }),
      this.prisma.wallet.update({
        where: { id: transaction.walletId },
        data: {
          currentBalance: newCurrentBalance
        }
      })
    ])

    return updatedTransaction
  }

  async delete(id: string, currentUserId: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id, wallet: { userId: currentUserId } },
      include: { wallet: true }
    })

    if (!transaction) throw new NotFoundException('Transaction not found')

    const [deletedTransaction] = await this.prisma.$transaction([
      this.prisma.transaction.delete({
        where: { id }
      }),
      this.prisma.wallet.update({
        where: { id: transaction.walletId },
        data: {
          currentBalance:
            transaction.type === 'INCOME'
              ? transaction.wallet.currentBalance - transaction.amount
              : transaction.wallet.currentBalance + transaction.amount
        }
      })
    ])

    return deletedTransaction
  }

  async findUnique(
    where: Prisma.TransactionWhereUniqueInput,
    currentUserId: string
  ): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: {
        ...where,
        wallet: { userId: currentUserId }
      }
    })
  }

  async findMany(
    currentUserId: string,
    args?: Prisma.TransactionFindManyArgs
  ): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      ...args,
      where: {
        AND: [{ ...args?.where }, { wallet: { userId: currentUserId } }]
      }
    })
  }

  async count(
    currentUserId: string,
    where?: Prisma.TransactionWhereInput
  ): Promise<number> {
    return this.prisma.transaction.count({
      where: {
        AND: [{ ...where }, { wallet: { userId: currentUserId } }]
      }
    })
  }
}
