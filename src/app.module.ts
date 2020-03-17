import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppGraphqlModule } from './graphql/app-graphql.module';
import { AppRestModule } from './rest/app-rest.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    AppGraphqlModule,
    AppRestModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
