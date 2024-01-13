import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as config from '../../../.././config';
import { AuthGuard } from 'src/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({ secret: config.env.secret, signOptions: { expiresIn: '7d' }, }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
})
export class UserModule {}
