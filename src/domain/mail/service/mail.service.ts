import { Injectable, NotFoundException } from "@nestjs/common";
import { MailRepository } from "src/infra/repositories/mail/mail.repository";
import Mail from "src/domain/mail/entity/mail";
import User from "src/domain/user/entity/user";
import { Cron, CronExpression } from '@nestjs/schedule';
import * as nodemailer from "nodemailer";
import axios from "axios";
import { report } from "process";
@Injectable()
export class MailService {
  constructor(
    private mailRepository: MailRepository,
  ) { }

  async scheduleEmails(user: User): Promise<void> {
    switch (user.getFrequency) {
      case 'WEEKLY':
        this.scheduleWeeklyEmail(user);
        break;
      case 'BIWEEKLY':
        this.scheduleBiWeeklyEmail(user);
        break;
      case 'MONTHLY':
        this.scheduleMonthlyEmail(user);
        break;
      case 'SEMESTERLY':
        this.scheduleSemesterlyEmail(user);
        break;
      default:
        throw new NotFoundException('Email preference not found.');
    }
  }

  @Cron(CronExpression.EVERY_WEEK)
  async scheduleWeeklyEmail(user: User): Promise<void> {
    const date = new Date();
    const userId = user.getId;
    const existingEmails = await this.mailRepository.findOne({ userId, date });
    console.log('Procurei por emails existentes');
    if (existingEmails) {
      throw new Error("Email already sent today.");
    }
    await this.sendEmail(user);
  }

  @Cron('0 0 15 * *')
  async scheduleBiWeeklyEmail(user: User): Promise<void> {
    const date = new Date();
    const userId = user.getId;

    const existingEmails = await this.mailRepository.findOne({ userId, date });
    if (existingEmails) {
      throw new Error("Email already sent today.");
    }
    await this.sendEmail(user);
  }

  @Cron('0 0 1 * *')
  async scheduleMonthlyEmail(user: User): Promise<void> {
    const date = new Date();
    const userId = user.getId;

    const existingEmails = await this.mailRepository.findOne({ userId, date });
    if (existingEmails) {
      throw new Error("Email already sent today.");
    }
    await this.sendEmail(user);
  }

  @Cron('0 0 1 1,7 *') 
  async scheduleSemesterlyEmail(user: User): Promise<void> {
    const date = new Date();
    const userId = user.getId;
    const existingEmails = await this.mailRepository.findOne({ userId, date });
    if (existingEmails) {
      throw new Error("Email already sent today.");
    }
    await this.sendEmail(user);
  }

  private async sendEmail(user): Promise<void> {
    const isValidEmailType = this.validateEmailType(user.getFrequency);
    if (!isValidEmailType) {
      throw new Error("Invalid email type.");
    }

    let reportData;
    try {
      const requestBody = {
        city: user.city,
        stateCode: user.stateCode,
        countryCode: user.countryCode,
        zip: user.zip,
      }
      const response = await axios.post('http://localhost:3001/climate', requestBody);
      reportData = response.data;
      console.log(reportData);
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching weather report.");
    }

    const now = new Date();
    const mail = new Mail(user.getId, now, user.getFrequency);

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