import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UnauthorizedException,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body(ValidationPipe) user: CreateUserDto,
    @Req() req: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    let loginResult = { res: null, err: null };

    loginResult = await this.userService.login(user);

    if (loginResult.err == 'not_found') {
      return 'login_failed';
    } else if (loginResult.err == 'check_email_or_password') {
      return 'signup';
    } else {
      // don't return password in userInfo
      delete loginResult.res.password;
      const payload = { user: loginResult.res };
      // generate JWT and store in cookies
      const jwt = await this.jwtService.signAsync(payload);
      response.cookie('auth-token', jwt, { httpOnly: true });

      req.session.user = JSON.parse(JSON.stringify(loginResult.res));
      return loginResult.res;
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: CreateUserDto) {
    if (!user) throw new UnauthorizedException();

    const userExist = await this.userService.checkUserExist(user.email);
    if (userExist) return 'user_already_exist';

    return this.userService.insertNewUser(user);
  }

  @Post('logout')
  async logout(@Req() req, @Res({ passthrough: true }) response: Response) {
    if (!req.session) return 1;

    response.clearCookie('auth-token');
    req.session.destroy(() => {
      return 1;
    });
  }
}
