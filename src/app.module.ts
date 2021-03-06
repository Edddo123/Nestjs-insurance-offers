import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './users/entities/client.entity';
import { PolicyModule } from './policy/policy.module';
import { Policy } from './policy/entities/policy.entity';
import { Insurer } from './users/entities/insurer.entity';
import { OffersModule } from './offers/offers.module';
import { Offers } from './offers/entities/offers.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ envFilePath: `.env` }),
    TypeOrmModule.forRoot(
      // {
      // type: 'postgres',
      // database: 'insurance',
      // host: 'localhost',
      // username: 'postgres',
      // entities: [Client, Policy, Insurer, Offers],
      // port: 5432,
      // password: process.env.DB_PASSWORD,
      // synchronize: true,
    // }
    ),
    PolicyModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieSession({ signed: false, secure: false }))
      .forRoutes('*'); 
  }
}
