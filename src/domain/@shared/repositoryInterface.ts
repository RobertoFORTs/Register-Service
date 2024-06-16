import { PageOptionsDto } from "src/api/shared/paginate-options.dto";

export default interface RepositoryInferface<T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T>;
  findAll(pageOptions: PageOptionsDto): Promise<T[]>;
}