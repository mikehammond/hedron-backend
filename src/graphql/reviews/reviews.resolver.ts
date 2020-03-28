import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';

import { ReviewsService } from '../../shared/services/reviews.service';
import { ReviewType } from './dto/review.dto';
import { ReviewInput } from './dto/review.input';
import { IUser } from '../../shared/interfaces/user.interface';

@Resolver('Reviews')
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService
  ) {}

  @Mutation(() => ReviewType)
  addReview(
    @Context('user') user: IUser,
    @Args('review') review: ReviewInput
  ) {
    if (!user) {
      throw new UnauthorizedException('You do not have the permission to add review');
    }

    return this.reviewsService.addReview(review);
  }
}
