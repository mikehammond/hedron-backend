import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IDemoRequest } from '../interfaces/demo-request.interface';
import { DemoRequestInput } from '../../app-graphql/demo-requests/dto/demo-request.input';

@Injectable()
export class DemoRequestsService {
  constructor(
    @InjectModel('DemoRequest') private readonly demoRequestModel: Model<IDemoRequest>
  ) {}

  async findWithFilter(filter: object): Promise<IDemoRequest[]> {
    return this.demoRequestModel.find(filter);
  }

  async requestDemo(demo: DemoRequestInput): Promise<IDemoRequest> {
    return this.demoRequestModel.create(demo);
  }
}