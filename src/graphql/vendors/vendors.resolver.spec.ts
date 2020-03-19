import { Test, TestingModule } from '@nestjs/testing';
import { VendorsResolver } from './vendors.resolver';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';

describe('VendorsResolver', () => {
  let resolver: VendorsResolver;

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
      providers: [VendorsResolver],
    }).compile();

    resolver = module.get<VendorsResolver>(VendorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
