import RepositoryInferface from "src/domain/@shared/repositoryInterface";
import Mail from "../entity/mail";
export default interface MailRepositoryInterface
  extends RepositoryInferface<Mail>{
  findOne(filter): Promise<any>;
  }