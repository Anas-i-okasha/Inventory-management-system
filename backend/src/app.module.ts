import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from '../../../config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.mysqlDB.host,
      port: config.mysqlDB.port,
      username: config.mysqlDB.user,
      password: config.mysqlDB.pass,
      database: config.mysqlDB.database,
      entities: [],
      retryAttempts: 5,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
