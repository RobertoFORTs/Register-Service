import { ApiProperty } from "@nestjs/swagger";
import { Frequency } from "./enums/frequency";
import { IsEnum } from "class-validator";

export default class User {
  @ApiProperty()
  private id: string;

  @ApiProperty()
  private name: string;

  @ApiProperty()
  private email: string;

  @IsEnum(Frequency)
  @ApiProperty({
    example: Frequency.WEEKLY,
    description: 'Tipo de anunciante',
    enum: Frequency,
    default: Frequency.MONTHLY,
  })
  private frequency: Frequency;

  @ApiProperty()
  private city: string;

  @ApiProperty()
  private stateCode: string | null;

  @ApiProperty()
  private countryCode: string | null;

  @ApiProperty()
  private zip: string | null;

  constructor(name: string, email: string, frequency: Frequency, city: string, stateCode?: string, countryCode?: string, zip?: string, id?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.frequency = frequency;
    this.city = city;
    this.countryCode = countryCode;
    this.stateCode = stateCode;
    this.zip = zip;
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

  
  public get getCity(): string {
    return this.city;
  }

  public get getCountryCode(): string {
    return this.countryCode;
  }

  public get getStateCode(): string {
    return this.stateCode;
  }

  public get getZip(): string {
    return this.zip;
  }
  
  public set setFrequency(value: Frequency) {
    this.frequency = value;
  }
  public set setCity(city: string) {
    this.city = city;
  }

  public set setCountryCode(countryCode: string) {
    this.countryCode = countryCode;
  }

  public set setStateCode(stateCode: string) {
    this.stateCode = stateCode;
  }

  public set setZip(zip: string) {
    this.zip = zip;
  }

}
