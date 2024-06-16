import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
 
  constructor({ id, name, email }: { id: string, name: string, email: string }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  @ApiProperty()
  id: string;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}