import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ReviewsResolver } from './reviews.resolver';
import { SharedModule } from '../../shared/shared.module';

describe('ReviewsResolver', () => {
  let resolver: ReviewsResolver;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
      providers: [ReviewsResolver],
    }).compile();

    resolver = module.get<ReviewsResolver>(ReviewsResolver);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
