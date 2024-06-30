import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { PrismaModule } from 'nestjs-prisma'

import { AuthModule } from './auth/auth.module'
import { AppAuthGuard } from './auth/guards/app-auth.guard'
import { CommonModule } from './common/common.module'
import config from './common/config/config'
import { TransactionsModule } from './transactions/transactions.module'
import { UsersModule } from './users/users.module'
import { WalletsModule } from './wallets/wallets.module'

import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { HttpException } from '@nestjs/common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: 'src/graphql/schema.gql',
      sortSchema: true,
      introspection: true,
      fieldResolverEnhancers: ['guards'],
      formatError: err => {
        const originalError = err.extensions?.originalError as
          | HttpException
          | undefined

        if (originalError) {
          return {
            ...originalError,
            path: err.path
          }
        }

        return err
      }
    }),
    PrismaModule.forRoot({
      isGlobal: true
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    UsersModule,
    AuthModule,
    WalletsModule,
    TransactionsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard
    }
  ]
})
export class AppModule {}
