import { ApiProperty } from "@nestjs/swagger";

export default class User {
  @ApiProperty()
  private id: string;

  @ApiProperty()
  private name: string;

  @ApiProperty()
  private email: string;

  @ApiProperty()
  private password: string;
  
  constructor(name: string, email: string, password: string, id?: string,) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }


  public get getId(): string {
    return this.id;
  }

  public set setId(value: string) {
    this.id = value;
  }

  public get getEmail(): string {
    return this.email;
  }
  
  public set setEmail(value: string) {
    this.email = value;
  }
  public get getName(): string {
    return this.name;
  }
  
  public set setName(value: string) {
    this.name = value;
  }

  public get getPassword(): string {
    return this.password;
  }
  
  public set setPassword(value: string) {
    this.password = value;
  }
}
