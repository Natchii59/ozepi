import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { endOfToday, startOfToday } from 'date-fns'
import { PrismaService } from 'nestjs-prisma'

import { TransactionsService } from './transactions.service'

@Injectable()
export class TransactionsCronService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionsService: TransactionsService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateFutureTransactions(): Promise<void> {
    await this.prisma.$transaction(async tx => {
      const wallets = await tx.wallet.findMany({
        where: { hasFutureTransactions: true }
      })

      for (const wallet of wallets) {
        const todaysTransactions = await tx.transaction.findMany({
          where: {
            walletId: wallet.id,
            AND: [
              { date: { gte: startOfToday() } },
              { date: { lte: endOfToday() } }
            ]
          }
        })

        const totalAmount = todaysTransactions.reduce((sum, transaction) => {
          return transaction.type === 'INCOME'
            ? sum + transaction.amount
            : sum - transaction.amount
        }, 0)

        const hasFutureTransactions =
          await this.transactionsService.hasFutureTransactions(wallet.id)

        await tx.wallet.update({
          where: { id: wallet.id },
          data: {
            currentBalance: { increment: totalAmount },
            hasFutureTransactions
          }
        })
      }
    })
  }
}
