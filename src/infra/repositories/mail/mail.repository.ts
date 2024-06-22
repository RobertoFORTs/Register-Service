import { Injectable } from "@nestjs/common";
import MailModel from "./mail.model";
import Mail from "src/domain/mail/entity/mail";
import MailRepositoryInterface from "src/domain/mail/repositoy/mail.repository.interface";
import { PageOptionsDto } from "src/api/shared/paginate-options.dto";
@Injectable()
export class MailRepository implements MailRepositoryInterface {

  constructor() {}
  
  async create(mail: Partial<Mail>): Promise<Mail> {
    const emailLog = await MailModel.create(mail);
    const mailEntityReturn: Mail = new Mail( emailLog.userId, emailLog.sentAt, emailLog.emailType, emailLog.id);
    return mailEntityReturn;
  }

  async update(entity: Mail): Promise<Mail> {
    console.log(entity);
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    await MailModel.destroy({ where: { id } });
  }
  async findById(id: string): Promise<Mail> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  async findAll(paginateOptions: PageOptionsDto): Promise<Mail[]> {
    console.log(paginateOptions);
    throw new Error("Method not implemented.");
  }

  async findOne(filter): Promise<any> {
    const { sentAt, userId } = filter;
    const returnObject = await MailModel.findOne(
      {
        where: {
          sentAt,
          userId,
        }
      }
    );

    return returnObject;
  }
}