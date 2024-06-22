import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  IsUUID,
  Default,
} from "sequelize-typescript";
import { Frequency } from "src/domain/user/entity/enums/frequency";
@Table({
  tableName: "user",
  timestamps: false,
})
export default class UserModel extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.ENUM("WEEKLY", "BIWEEKLY", "MONTHLY", "SEMESTERLY"))
  frequency: Frequency;
}