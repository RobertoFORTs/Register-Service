import { Injectable } from '@nestjs/common';
import UserRepository from 'src/infra/repositories/user/user.repository';
import User from '../entity/user';
import { PageOptionsDto } from 'src/api/shared/paginate-options.dto';
import { CreateUserDto } from 'src/api/User/dtos/create-user.dto';
import { MailService } from 'src/domain/mail/service/mail.service';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private mailService: MailService,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, frequency } = createUserDto;
    const user = new User(name, email, frequency);
    const result: User = await this.repository.create(user);
    try {
      await this.mailService.scheduleEmails(result);
    } catch (error) {
      console.error(error);
      throw new Error('Error scheduling emails');
    }
    return result;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<User> {
    const result = await this.repository.findById(id);
    return result;
  }
  
  async findAll(paginateOptions: PageOptionsDto) {
    const result = await this.repository.findAll(paginateOptions);
    return result;
  }
}