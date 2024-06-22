import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
  Default,
  CreatedAt,
} from "sequelize-typescript";
import UserModel from "../user/user.model";

@Table({
  tableName: "email_logs",
  timestamps: true, // Ativa timestamps se você quiser registrar `createdAt` e `updatedAt`
})
export default class MailModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  userId: string;

  @CreatedAt
  sentAt: Date;

  @Column(DataType.STRING)
  emailType: string;
}