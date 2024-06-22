import { Injectable, NotFoundException } from "@nestjs/common";
import { MailRepository } from "src/infra/repositories/mail/mail.repository";
import { UserService } from "src/domain/user/service/user.service";
import Mail from "src/domain/mail/entity/mail";
import User from "src/domain/user/entity/user";
import { Cron, CronExpression } from '@nestjs/schedule';
import * as nodemailer from "nodemailer";
@Injectable()
export class MailService {
  constructor(
    private mailRepository: MailRepository,
    private userService: UserService,
  ) { }

  async scheduleEmails(user: User): Promise<void> {
    switch (user.getFrequency) {
      case 'DAILY':
        this.scheduleDailyEmail(user.getId, user.getFrequency);
        break;
      case 'WEEKLY':
        this.scheduleWeeklyEmail(user.getId, user.getFrequency);
        break;
      case 'MONTHLY':
        this.scheduleMonthlyEmail(user.getId, user.getFrequency);
        break;
      case 'SEMESTERLY':
        this.scheduleSemesterlyEmail(user.getId, user.getFrequency);
        break;
      default:
        throw new NotFoundException('Email preference not found.');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async scheduleDailyEmail(userId: string, emailType: string): Promise<void> {
    await this.sendEmail(userId, emailType);
  }

  @Cron(CronExpression.EVERY_WEEK)
  async scheduleWeeklyEmail(userId: string, emailType: string): Promise<void> {
    await this.sendEmail(userId, emailType);
  }

  @Cron('0 0 1 * *')
  async scheduleMonthlyEmail(userId: string, emailType: string): Promise<void> {
    await this.sendEmail(userId, emailType);
  }

  @Cron('0 0 1 1,7 *') 
  async scheduleSemesterlyEmail(userId: string, emailType: string): Promise<void> {
    await this.sendEmail(userId, emailType);
  }

  private async sendEmail(userId: string, emailType: string): Promise<void> {
    const isValidEmailType = this.validateEmailType(emailType);
    if (!isValidEmailType) {
      throw new Error("Invalid email type.");
    }

    const user: User = await this.userService.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const now = new Date();
    const mail = new Mail(userId, now, emailType);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testebobvini123@gmail.com",
        pass: "bobvini123@",
      }
    });


    const mailOptions = {
      from: '"NewsLetter Wheater" <testebobvini123@gmail.com>',
      to: user.getEmail, 
      subject: "Relatório do Tempo", 
      text: "INTEGRAÇÃO COM API DE TEMPO AQUI", 
    };

    try {
      await transporter.sendMail(mailOptions);
      await this.mailRepository.create(mail);
    } catch (error) {
      console.error(error);
      throw new Error("Error sending email.");
    }
    return;
  }

  private validateEmailType(emailType: string): boolean {
    const validTypes = ["DAILY", "WEEKLY", "MONTHLY", "SEMESTERLY"];
    return validTypes.includes(emailType);
  }
}