import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatsResolver } from './chats.resolver';
import { SharedModule } from '../../shared/shared.module';

describe('ChatsResolver', () => {
  let resolver: ChatsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }),
        SharedModule,
      ],
      providers: [ChatsResolver],
    }).compile();

    resolver = module.get<ChatsResolver>(ChatsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
