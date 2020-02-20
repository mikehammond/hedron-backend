import { Module } from '@nestjs/common';
import { ProductResolver } from './product/product.resolver';

@Module({
  providers: [ProductResolver],
})
export class ProductsModule {}
