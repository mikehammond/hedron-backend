import { Test, TestingModule } from '@nestjs/testing';
import { DemoRequestsResolver } from './demo-requests.resolver';

describe('DemoRequestsResolver', () => {
  let resolver: DemoRequestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoRequestsResolver],
    }).compile();

    resolver = module.get<DemoRequestsResolver>(DemoRequestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
