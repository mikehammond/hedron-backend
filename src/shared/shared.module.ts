import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import * as uniqueValidator from 'mongoose-unique-validator';

import { WatsonDicoveryService } from './services/watson-discovery.service';
import { IBMCloudObjectStorageService } from './services/ibm-cos.service';
import { ProductsService } from './services/products.service';
import { DemoRequestsService } from './services/demo-requests.service';
import { WatsonAssistantService } from './services/watson-assistant.service';

import { ProductSchema, ReviewSchema, FAQSchema } from './schemas/product.schema';
import { DemoRequestSchema } from './schemas/demo-request.schema';
import { VendorSchema } from './schemas/vendor.schema';
import { VendorsService } from './services/vendors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema.plugin(uniqueValidator) },
      { name: 'Review', schema: ReviewSchema.plugin(uniqueValidator) },
      { name: 'FAQ', schema: FAQSchema.plugin(uniqueValidator) },
      { name: 'DemoRequest', schema: DemoRequestSchema.plugin(uniqueValidator) },
      { name: 'Vendor', schema: VendorSchema.plugin(uniqueValidator) },
    ])
  ],
  providers: [
    ConfigService,
    ProductsService,
    DemoRequestsService,
    VendorsService,
    WatsonDicoveryService,
    WatsonAssistantService,
    IBMCloudObjectStorageService,
  ],
  exports: [
    ConfigService,
    ProductsService,
    DemoRequestsService,
    VendorsService,
    WatsonDicoveryService,
    WatsonAssistantService,
    IBMCloudObjectStorageService,
  ]
})
export class SharedModule {}
