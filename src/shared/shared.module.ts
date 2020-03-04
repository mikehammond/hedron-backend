import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { IBMDicoveryService } from './services/ibm-discovery.service';
import { IBMCloudObjectStorageService } from './services/ibm-cos.service';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from './services/products.service';
import { ProductSchema, ReviewSchema, FAQSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema.plugin(uniqueValidator) },
      { name: 'Review', schema: ReviewSchema.plugin(uniqueValidator) },
      { name: 'FAQ', schema: FAQSchema.plugin(uniqueValidator) },
    ])
  ],
  providers: [
    ConfigService,
    ProductsService,
    IBMDicoveryService,
    IBMCloudObjectStorageService,
  ],
  exports: [
    ConfigService,
    ProductsService,
    IBMDicoveryService,
    IBMCloudObjectStorageService,
  ]
})
export class SharedModule {}