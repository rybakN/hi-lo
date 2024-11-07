import { RepositoryInterface } from "../interfaces/repository.interface";

export class Repository<T> implements RepositoryInterface<T> {
  private data: Array<T> = [];

  constructor() {}

  public save(entity: T) {
    this.data.push(entity);
  }
}
