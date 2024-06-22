import { ApiProperty } from '@nestjs/swagger';
import { Frequency } from 'src/domain/user/entity/enums/frequency';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ enum: Frequency, required: true })
  frequency: Frequency;
}