import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Transaction } from '@prisma/client'
import { differenceInDays, startOfDay, startOfToday } from 'date-fns'
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

    return this.prisma.$transaction(async tx => {
      const transaction = await tx.transaction.create({
        data: {
          title: input.title,
          amount: input.amount,
          date: startOfDay(input.date),
          type: input.type,
          walletId: input.walletId
        }
      })

      await tx.wallet.update({
        where: { id: input.walletId },
        data: {
          currentBalance:
            input.type === 'INCOME'
              ? wallet.currentBalance + input.amount
              : wallet.currentBalance - input.amount
        }
      })

      const isInFuture = differenceInDays(startOfToday(), input.date) < 0
      if (isInFuture) {
        await tx.wallet.update({
          where: { id: input.walletId },
          data: { hasFutureTransactions: true }
        })
      }

      return transaction
    })
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

    const newDate = input.date ? startOfDay(input.date) : transaction.date

    return this.prisma.$transaction(async tx => {
      const updatedTransaction = await tx.transaction.update({
        where: { id },
        data: {
          ...input,
          date: newDate
        }
      })

      await tx.wallet.update({
        where: { id: updatedTransaction.walletId },
        data: {
          currentBalance: newCurrentBalance
        }
      })

      if (input.date) {
        const isInFuture = differenceInDays(startOfToday(), input.date) < 0

        if (isInFuture) {
          await tx.wallet.update({
            where: { id: updatedTransaction.walletId },
            data: { hasFutureTransactions: true }
          })
        } else {
          const hasFutureTransactions = await this.hasFutureTransactions(
            updatedTransaction.walletId
          )

          if (!hasFutureTransactions) {
            await tx.wallet.update({
              where: { id: updatedTransaction.walletId },
              data: { hasFutureTransactions: false }
            })
          }
        }
      }

      return updatedTransaction
    })
  }

  async delete(id: string, currentUserId: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id, wallet: { userId: currentUserId } },
      include: { wallet: true }
    })

    if (!transaction) throw new NotFoundException('Transaction not found')

    return this.prisma.$transaction(async tx => {
      const deletedTransaction = await tx.transaction.delete({
        where: { id }
      })

      await tx.wallet.update({
        where: { id: transaction.walletId },
        data: {
          currentBalance:
            transaction.type === 'INCOME'
              ? transaction.wallet.currentBalance - transaction.amount
              : transaction.wallet.currentBalance + transaction.amount
        }
      })

      const isInFuture = differenceInDays(startOfToday(), transaction.date) < 0
      if (isInFuture) {
        const hasFutureTransactions = await this.hasFutureTransactions(
          transaction.walletId
        )

        if (!hasFutureTransactions) {
          await tx.wallet.update({
            where: { id: transaction.walletId },
            data: { hasFutureTransactions: false }
          })
        }
      }

      return deletedTransaction
    })
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

  async hasFutureTransactions(walletId: string): Promise<boolean> {
    const today = startOfToday()

    const count = await this.prisma.transaction.count({
      where: {
        walletId,
        date: { gt: today }
      }
    })

    return count > 0
  }
}
