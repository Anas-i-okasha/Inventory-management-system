import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from '../../../config';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
// import * as onHeaders from 'on-headers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    // methods: ['GET', 'POST'],
  });

  app.use(cookieParser());
  app.use(
    session({
      key: config.env.sessionKey,
      secret: config.env.secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    }),
  );

  // app.use(function (req, res, next) {
  //   const token = req.cookies['token'];
  //   // if (token) {
  //   //   res.setHeader('Authorization', `Bearer ${token}`);
  //   // }
  //   // onHeaders(res, () => {
  //   if (token) {
  //     req.headers.authorization = `Bearer ${token}`;
  //   }
  //   // });

  //   next();
  // });
  await app.listen(config.env.nestport);
}
bootstrap();
