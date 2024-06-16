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
    const { name, email, password } = createUserDto;
    const user = new User(name, email, password);
    const result = await this.repository.create(user);
    return result;
  }

  findAll(paginateOptions: PageOptionsDto) {
    const result = this.repository.findAll(paginateOptions);
    return result;
  }
}