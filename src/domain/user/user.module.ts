import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from 'src/infra/repositories/user/user.model';
import UserRepository from 'src/infra/repositories/user/user.repository';
import { UserService } from './service/user.service';
import { UserController } from 'src/api/User/user.controller';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    MailModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}