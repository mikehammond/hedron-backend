import { Module } from '@nestjs/common';
import { VendorsResolver } from './vendors.resolver';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [VendorsResolver]
})
export class VendorsModule {}
