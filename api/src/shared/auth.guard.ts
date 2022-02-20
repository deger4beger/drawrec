import {ForbiddenException, Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import {JWT_SECRET} from '../../config/config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    if (!request.headers.authorization) {
      return false
    }

    request.user = await this.validateToken(request.headers.authorization)

    return true
  }

  async validateToken(auth: string) {
    if (auth.split(" ")[0] !== "Bearer") {
      throw new ForbiddenException("Invalid token")
    }
    const token = auth.split(" ")[1]
    try {
      jwt.verify(token, JWT_SECRET)
    } catch (err) {
      const message = "Token error: " + (err.message || err.name)
      throw new ForbiddenException(message)
    }
  }
}