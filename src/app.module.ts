import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { PaginateModule } from 'nestjs-sequelize-paginate'
import { UserModule } from './domain/user/user.module';
import { MailModule } from './domain/mail/mail.module';

config();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    PaginateModule.forRoot({
      url: 'http://localhost:5000',
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
