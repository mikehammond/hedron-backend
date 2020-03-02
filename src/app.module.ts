import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGraphqlModule } from './app-graphql/app-graphql.module';

@Module({
  imports: [
    AppGraphqlModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
