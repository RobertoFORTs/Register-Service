import { ApiProperty } from "@nestjs/swagger";
import { Frequency } from "./enums/frequency";

export default class User {
  @ApiProperty()
  private id: string;

  @ApiProperty()
  private name: string;

  @ApiProperty()
  private email: string;

  @ApiProperty({ enum: Frequency })
  private frequency: Frequency;

  constructor(name: string, email: string, frequency: Frequency, id?: string,) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.frequency = frequency;
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

  public get getFrequency(): Frequency {
    return this.frequency;
  }
  
  public set setFrequency(value: Frequency) {
    this.frequency = value;
  }
}
