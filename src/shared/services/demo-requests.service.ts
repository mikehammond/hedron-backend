import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IDemoRequest } from '../interfaces/demo-request.interface';
import { DemoRequestInput } from '../../graphql/demo-requests/dto/demo-request.input';

@Injectable()
export class DemoRequestsService {
  constructor(
    @InjectModel('DemoRequest') private readonly demoRequestModel: Model<IDemoRequest>
  ) {}

  async allDemoRequests(filter: object): Promise<IDemoRequest[]> {
    try {
      return await this.demoRequestModel.find(filter);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addDemoRequest(demo: DemoRequestInput): Promise<IDemoRequest> {
    try {
      return await this.demoRequestModel.create(demo);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}