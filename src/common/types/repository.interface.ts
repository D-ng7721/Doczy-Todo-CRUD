export interface IRepository<T> {
  create: (...params: any[]) => Promise<T>;
  findOne: (...params: any[]) => Promise<T>;
  find: (...params: any[]) => Promise<T[]>;
  update: (...params: any[]) => Promise<T>;
  delete: (...params: any[]) => Promise<T>;
}
