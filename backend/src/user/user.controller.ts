import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() user,
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
      delete loginResult.res[0].password;
      const payload = { user: loginResult.res[0] };
      const jwt = await this.jwtService.signAsync(payload);
      response.cookie('token', jwt, { httpOnly: true });
      req.session.user = JSON.parse(JSON.stringify(loginResult.res));
      return loginResult.res;
    }
  }

  @Post('register')
  async register(@Body() user) {
    if (!user) throw new UnauthorizedException();

    const userExist = await this.userService.checkUserExist(user.email);
    if (userExist) return 'user_already_exist';

    return this.userService.insertNewUser(user);
  }

  @Post('logout')
  async logout(@Req() req, @Res({ passthrough: true }) response: Response) {
    if (!req.session) return 1;

    response.clearCookie('token');
    req.session.destroy(() => {
      return 1;
    });
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async findAll(@Req() request) {
    const res = request.headers;
    const cookie = request.cookies['token'];
    // return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.userService.remove(+id);
  }
}
