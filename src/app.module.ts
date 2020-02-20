import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGraphqlModule } from './app-graphql/app-graphql.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: './src/app-graphql/graphql.ts',
      },
    }),
    AppGraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
