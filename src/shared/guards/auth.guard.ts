import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';;

import { verifyJWT } from '../../utils/helpers';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    try {
      const user = await verifyJWT(authorization.split(' ')[1]);
      request.user = user;
      return true
    } catch (error) {
      return false;
    }
  }
}