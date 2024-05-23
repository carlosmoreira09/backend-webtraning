import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  @Inject(AuthService) helper: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    console.log('inicio1');
    const jwtToken = context
      .switchToHttp()
      .getRequest()
      .headers['authorization'].split('Bearer ')[1];
    let user: UsersEntity = null;
    console.log(jwtToken);
    if (jwtToken) {
      console.log('teste');
      if (await this.helper.validate(jwtToken)) {
        user = await this.helper.decode(jwtToken);
      }
    }
    console.log(user);
    return !(user && user.username);
  }
}
