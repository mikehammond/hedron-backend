import { Module } from '@nestjs/common';

import { ProductsResolver } from './products.resolver';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    SharedModule,
  ],
  providers: [
    ProductsResolver,
  ],
})
export class ProductsModule {}
