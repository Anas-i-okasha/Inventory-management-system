import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UserModule } from './user/user.module';
import * as config from '../../../config';
import { join } from 'path';
import { AuthGuard } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.mysqlDB.host,
      port: config.mysqlDB.port,
      username: config.mysqlDB.user,
      password: config.mysqlDB.pass,
      database: config.mysqlDB.database,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      retryAttempts: 5,
      //synchronize
    }),
    UserModule,
    ProductsModule,
    JwtModule.register({
      secret: config.env.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, AuthGuard, JwtService],
})
export class AppModule {}
