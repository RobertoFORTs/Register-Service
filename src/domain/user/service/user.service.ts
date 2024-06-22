import { Injectable } from '@nestjs/common';
import UserRepository from 'src/infra/repositories/user/user.repository';
import User from '../entity/user';
import { PageOptionsDto } from 'src/api/shared/paginate-options.dto';
import { CreateUserDto } from 'src/api/User/dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, frequency } = createUserDto;
    const user = new User(name, email, frequency);
    const result = await this.repository.create(user);
    return result;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  
  async findAll(paginateOptions: PageOptionsDto) {
    const result = await this.repository.findAll(paginateOptions);
    return result;
  }
}