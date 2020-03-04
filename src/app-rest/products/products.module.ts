import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    SharedModule
  ],
  controllers: [ProductsController]
})
export class ProductsModule {}
