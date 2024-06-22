import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailService } from './service/mail.service';
import { MailRepository } from 'src/infra/repositories/mail/mail.repository';
import MailModel from 'src/infra/repositories/mail/mail.model';

@Module({
  imports: [
    SequelizeModule.forFeature([MailModel]), 
  ],
  controllers: [],
  providers: [MailService, MailRepository],

  exports: [MailService]
})
export class MailModule {}