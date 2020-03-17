import { Module } from '@nestjs/common';
import { DemoRequestsResolver } from './demo-requests.resolver';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [DemoRequestsResolver]
})
export class DemoRequestsModule {}
