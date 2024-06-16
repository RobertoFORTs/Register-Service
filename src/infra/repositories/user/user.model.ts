import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  IsUUID,
  Default,
} from "sequelize-typescript";

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

  @Column(DataType.STRING)
  password: string;
}