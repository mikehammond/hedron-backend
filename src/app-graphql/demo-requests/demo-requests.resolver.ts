import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';

import { DemoRequestsService } from '../../shared/services/demo-requests.service';
import { DemoRequestType } from './dto/demo-request.dto';
import { DemoRequestFilter, DemoRequestInput } from './dto/demo-request.input';

@Resolver('DemoRequests')
export class DemoRequestsResolver {
  constructor(
    private readonly demoRequestsService: DemoRequestsService,
  ) {}

  @Query(() => [DemoRequestType])
  async demoRequests(
    @Args('filter') filter: DemoRequestFilter
  ): Promise<DemoRequestType[]> {
    return this.demoRequestsService.findWithFilter(filter);
  }

  @Mutation(() => DemoRequestType)
  async requestDemo(
    @Args('demo') demo: DemoRequestInput
  ): Promise<DemoRequestType> {
    return this.demoRequestsService.requestDemo(demo);
  }
}
