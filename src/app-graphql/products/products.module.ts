import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { IBMDicoveryService } from '../../utils/services/ibm-discovery.service';
import { ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema }
    ])
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    IBMDicoveryService,
    ConfigService
  ],
})
export class ProductsModule {}
