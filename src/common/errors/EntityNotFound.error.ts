import { CustomError } from './CustomError.error';
import { Class } from '../types';

export class EntityNotFound<T> extends CustomError {
  constructor(clazz: Class<T>) {
    super(`${clazz.name} entity not found`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}
