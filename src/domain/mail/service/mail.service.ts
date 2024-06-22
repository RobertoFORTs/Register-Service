import { Injectable, NotFoundException } from "@nestjs/common";
import { MailRepository } from "src/infra/repositories/mail/mail.repository";
import Mail from "src/domain/mail/entity/mail";
import User from "src/domain/user/entity/user";
import { Cron, CronExpression } from '@nestjs/schedule';
import * as nodemailer from "nodemailer";
import axios from "axios";
import { Frequency } from "src/domain/user/entity/enums/frequency";
@Injectable()
export class MailService {
  constructor(
    private mailRepository: MailRepository,
  ) { }

  async scheduleEmails(user: User): Promise<void> {
    switch (user.getFrequency) {
      case 'DAILY':
        this.scheduleDailyEmail(user.getId, user.getFrequency, user.getEmail);
        break;
      case 'WEEKLY':
        this.scheduleWeeklyEmail(user.getId, user.getFrequency, user.getEmail);
        break;
      case 'MONTHLY':
        this.scheduleMonthlyEmail(user.getId, user.getFrequency, user.getEmail);
        break;
      case 'SEMESTERLY':
        this.scheduleSemesterlyEmail(user.getId, user.getFrequency, user.getEmail);
        break;
      default:
        throw new NotFoundException('Email preference not found.');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async scheduleDailyEmail(userId: string, emailType: Frequency, email: string): Promise<void> {
    const date = new Date();
    const existingEmails = await this.mailRepository.findOne({ userId, date });
    if (existingEmails) {
      throw new Error("Email already sent today.");
    }
    await this.sendEmail(userId, emailType, email);
  }

  @Cron(CronExpression.EVERY_WEEK)
  async scheduleWeeklyEmail(userId: string, emailType: Frequency, email: string): Promise<void> {
    const date = new Date();
    const existingEmails = await this.mailRepository.findOne({ userId, date });
    if (existingEmails) {
      throw new Error("Email already sent today.");
    }
    await this.sendEmail(userId, emailType, email);
  }

  @Cron('0 0 1 * *')
  async scheduleMonthlyEmail(userId: string, emailType: Frequency, email: string): Promise<void> {
    const date = new Date();
    const existingEmails = await this.mailRepository.findOne({ userId, date });
    if (existingEmails) {
      throw new Error("Email already sent today.");
    }
    await this.sendEmail(userId, emailType, email);
  }

  @Cron('0 0 1 1,7 *') 
  async scheduleSemesterlyEmail(userId: string, emailType: Frequency, email: string): Promise<void> {
    const date = new Date();
    const existingEmails = await this.mailRepository.findOne({ userId, date });
    if (existingEmails) {
      throw new Error("Email already sent today.");
    }
    await this.sendEmail(userId, emailType, email);
  }

  private async sendEmail(userId: string, emailType: string, email: string): Promise<void> {
    const isValidEmailType = this.validateEmailType(emailType);
    if (!isValidEmailType) {
      throw new Error("Invalid email type.");
    }


    let reportData;
    try {
      const response = await axios.get('http://localhost:8080/climate');
      reportData = response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching weather report.");
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
      to: email, 
      subject: "Relatório do Tempo", 
      text: `Aqui estão os dados do tempo: ${reportData}`, 
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