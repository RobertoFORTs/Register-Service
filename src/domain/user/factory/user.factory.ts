import User from "../entity/user";

export default class UserFactory {
  public static create(name, email, frequency, city): User {
    return new User(name, email, frequency, city);
  }
}