import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { UnauthorizedException, UseFilters } from '@nestjs/common';

import { DemoRequestsService } from '../../shared/services/demo-requests.service';
import { DemoRequestType } from './dto/demo-request.dto';
import { DemoRequestFilter, DemoRequestInput } from './dto/demo-request.input';
import { IUser } from '../../shared/interfaces/user.interface';
import { GraphqlExceptionFilter } from '../../shared/filters/graphql-exception.filter';

@Resolver('DemoRequests')
@UseFilters(GraphqlExceptionFilter)
export class DemoRequestsResolver {
  constructor(
    private readonly demoRequestsService: DemoRequestsService,
  ) {}

  @Query(() => [DemoRequestType])
  async allDemoRequests(
    @Context('user') user: IUser,
    @Args('filter') filter: DemoRequestFilter
  ): Promise<DemoRequestType[]> {
    if (!user) {
      throw new UnauthorizedException('unauthorized to retrieve demo requests');
    }

    return this.demoRequestsService.allDemoRequests(filter);
  }

  @Mutation(() => DemoRequestType)
  async addDemoRequest(
    @Args('demo') demo: DemoRequestInput
  ): Promise<DemoRequestType> {
    return this.demoRequestsService.addDemoRequest(demo);
  }
}
