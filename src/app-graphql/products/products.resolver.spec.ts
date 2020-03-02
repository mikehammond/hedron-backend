import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { IBMDicoveryService } from '../../utils/services/ibm-discovery.service';
import { ProductSchema } from './schemas/product.schema';

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
          useFindAndModify: false
        }),
        MongooseModule.forFeature([
          { name: 'Product', schema: ProductSchema }
        ]),
      ],
      providers: [
        ProductsResolver,
        ProductsService,
        IBMDicoveryService,
        ConfigService
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get products by filters', async () => {
    const products = await resolver.products({ trashed: false });
    expect(products.length).toBeGreaterThanOrEqual(0);
  });

  it('should add product to database', async () => {
    const product = await resolver.addProduct({
      name: "Test Product",
      description: "Description of Test Product"
    });
    expect(product).toBeDefined();
    expect(product.name).toEqual("Test Product");
    expect(product.description).toEqual("Description of Test Product");
  });
});
