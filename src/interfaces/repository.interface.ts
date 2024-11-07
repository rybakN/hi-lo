export interface RepositoryInterface<T> {
  save(entity: T): void;
}
