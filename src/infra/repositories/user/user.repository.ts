import { Injectable } from "@nestjs/common";
import { PageOptionsDto } from "src/api/shared/paginate-options.dto";
import { PaginateService } from 'nestjs-sequelize-paginate';
import UserRepositoryInterface from "src/domain/user/repositoryInterface/user.repository.interface";
import User from "src/domain/user/entity/user";
import UserModel from "./user.model";

@Injectable()
export default class UserRepository implements UserRepositoryInterface{
  constructor(
    private paginationService: PaginateService,
  ) {}
  async create(entity: User): Promise<User> {
    try {
      const newUser: UserModel = await UserModel.create({
        name: entity.getName,
        email: entity.getEmail,
        password: entity.getPassword,
      });
      const userEntityReturn: User = new User (newUser.name, newUser.email, newUser.password, newUser.id);
      return userEntityReturn;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating User entity');
    }
  }
  
  async update(entity: User): Promise<User> {
    console.log(entity);
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    await UserModel.destroy({ where: { id } });
  }
  async findById(id: string): Promise<User> {
    console.log(id);
    throw new Error("Method not implemented.");
  }

  async findAll(paginateOptions: PageOptionsDto) {

    const pageOptions = new PageOptionsDto(paginateOptions);
    const returnObject = await this.paginationService.findAllPaginate({
      page: pageOptions.page,
      offset: pageOptions.take,
      model: UserModel,
    });
    return returnObject;
  }
}