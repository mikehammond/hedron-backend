import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsResolver } from './products.resolver';
import { SharedModule } from '../../shared/shared.module';

const user = {
  // iss: 'https://dev-6a34f-yl.auth0.com/',
  sub: 'EJTH7kHjCvZO3MAMTKV4Vp0sD3fZKGJR@clients',
  // aud: 'https://deegify.dev',
  // iat: 1583104695,
  // exp: 1583191095,
  // azp: 'EJTH7kHjCvZO3MAMTKV4Vp0sD3fZKGJR',
  // scope: 'create:products update:products delete:products approve_changes:products',
  // gty: 'client-credentials',
  permissions: [
    'read:products',
    'create:products',
    'update:products',
    'delete:products',
    'approve_changes:products'
  ]
}

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;
  let module: TestingModule

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
      providers: [ProductsResolver],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get products by filters', async () => {
    const products = await resolver.products(user, { archived: false, status: 'pending' });
    expect(products.length).toBeGreaterThanOrEqual(0);
  });

  // it('should add product to database', async () => {
  //   const product = await resolver.addProduct(user, {
  //     name: "Test Product",
  //     description: "Description of Test Product"
  //   }, []);
  //   expect(product).toBeDefined();
  //   expect(product.name).toEqual("Test Product");
  //   expect(product.description).toEqual("Description of Test Product");
  // });
});
