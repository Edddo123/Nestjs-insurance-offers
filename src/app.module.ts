import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, 
    ConfigModule.forRoot({ envFilePath: `.env` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'insurance',
      host: 'localhost',
      username: 'postgres',
      port: 5432,
      password: process.env.DB_PASSWORD

    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {}
