import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiOperation} from '@nestjs/swagger';
import { BadRequestResponse } from '../exceptions/bad-request.response';
import { PageOptionsDto } from '../shared/paginate-options.dto';
import { ApiPaginatedResponse } from 'src/decorators/pagination.decorator';
import { UserResponseDto } from './dtos/response-user.dto';
import { PaginatedOutputDto } from '../shared/paginate-response.dto';
import { mapTo } from '../../utils/map-to';
import { UserService } from 'src/domain/user/service/user.service';
import User from 'src/domain/user/entity/user';
import { CreateUserDto } from './dtos/create-user.dto';


@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: [User],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestResponse,
  })
  @ApiOperation({ summary: 'Creates a new Announcement' })
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Get()
  @ApiPaginatedResponse(UserResponseDto)
  async getAll(
    @Query() paginateOptions: PageOptionsDto,
  ): Promise<PaginatedOutputDto<UserResponseDto>> {
    const result = await this.userService.findAll(paginateOptions);
    const response: PaginatedOutputDto<UserResponseDto> = {
      data: result.items.map((item) => mapTo(item as any, UserResponseDto)),
      meta: {
        page: result.page,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        itemCount: result.itemCount,
        prev: result.prev,
        next: result.next,
      },
    };
    return response;
  }
}