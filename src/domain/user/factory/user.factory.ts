import User from "../entity/user";

export default class UserFactory {
  public static create(name, email, password): User {
    return new User(name, email, password);
  }
}