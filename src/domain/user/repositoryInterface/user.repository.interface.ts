import RepositoryInferface from "src/domain/@shared/repositoryInterface";
import User from "../entity/user";
export default interface UserRepositoryInterface
  extends RepositoryInferface<User>{}