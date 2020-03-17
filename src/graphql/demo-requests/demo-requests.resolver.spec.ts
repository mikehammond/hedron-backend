import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DemoRequestsResolver } from './demo-requests.resolver';
import { SharedModule } from '../../shared/shared.module';

describe('DemoRequestsResolver', () => {
  let resolver: DemoRequestsResolver;

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
      providers: [DemoRequestsResolver],
    }).compile();

    resolver = module.get<DemoRequestsResolver>(DemoRequestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
