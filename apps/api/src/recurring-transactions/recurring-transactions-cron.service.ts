import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { RecurringTransaction } from '@prisma/client'
import { endOfToday, startOfToday } from 'date-fns'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class RecurringTransactionsCronService {
  constructor(private readonly prisma: PrismaService) {}

  private async createTransaction(
    recurringTransaction: RecurringTransaction
  ): Promise<void> {
    await this.prisma.transaction.create({
      data: {
        title: recurringTransaction.title,
        amount: recurringTransaction.amount,
        type: recurringTransaction.type,
        date: endOfToday(),
        walletId: recurringTransaction.walletId
      }
    })
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async recurringTransactions(): Promise<void> {
    const today = startOfToday()

    const recurringTransactions =
      await this.prisma.recurringTransaction.findMany()

    for (const recurringTransaction of recurringTransactions) {
      switch (recurringTransaction.frequency) {
        case 'DAILY':
          await this.createTransaction(recurringTransaction)
          break
        case 'WEEKLY':
          if (recurringTransaction.dayOfWeek === today.getDay()) {
            await this.createTransaction(recurringTransaction)
          }
          break
        case 'MONTHLY':
          if (recurringTransaction.dayOfMonth === today.getDate()) {
            await this.createTransaction(recurringTransaction)
          }
          break
        case 'YEARLY':
          if (
            recurringTransaction.dayOfMonth === today.getDate() &&
            recurringTransaction.month === today.getMonth()
          ) {
            await this.createTransaction(recurringTransaction)
          }
          break
      }
    }
  }
}
