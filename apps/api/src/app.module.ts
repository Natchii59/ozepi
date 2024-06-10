import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { AppResolver } from './app.resolver'
import { AppService } from './app.service'

import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { HttpException } from '@nestjs/common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: 'src/graphql/schema.gql',
      sortSchema: true,
      introspection: true,
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
    })
  ],
  providers: [AppService, AppResolver]
})
export class AppModule {}
