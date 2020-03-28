import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IReview } from "../interfaces/review.interface";
import { InjectModel } from "@nestjs/mongoose";
import { ReviewInput } from "../../graphql/reviews/dto/review.input";


@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<IReview>
  ) {}

  async filterReviews(filter: object) {
    return await this.reviewModel.find(filter);
  }

  async addReview(review: ReviewInput) {
    return await this.reviewModel.create(review);
  }
}