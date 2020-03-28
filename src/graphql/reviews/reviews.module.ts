import { Module } from '@nestjs/common';

import { ReviewsResolver } from './reviews.resolver';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [ReviewsResolver]
})
export class ReviewsModule {}
