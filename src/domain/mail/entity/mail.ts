export default class Mail {
  id: string;
  userId: string;
  sentAt: Date;
  emailType: string;

  constructor(userId: string, sentAt: Date, emailType: string, id?: string) {
    this.id = id;
    this.userId = userId;
    this.sentAt = sentAt;
    this.emailType = emailType;
  }

  validateEmailType(): boolean {
    const validTypes = ["DAILY", "WEEKLY", "MONTHLY", "SEMESTERLY"];
    return validTypes.includes(this.emailType);
  }
};