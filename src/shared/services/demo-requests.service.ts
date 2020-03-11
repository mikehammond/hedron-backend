import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IDemoRequest } from '../interfaces/demo-request.interface';

@Injectable()
export class DemoRequestsService {
  constructor(
    @InjectModel('DemoRequest') private readonly demoRequestModel: Model<IDemoRequest>
  ) {
    
  }
}