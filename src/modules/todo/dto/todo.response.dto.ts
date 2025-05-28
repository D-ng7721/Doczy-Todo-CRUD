import { Status } from '../types/status.enum';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class TodoResponseDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  title: string;

  @Expose()
  content?: string;

  @Expose()
  status?: Status;

  @Expose()
  dateTime?: string;

  @Expose()
  createdAt?: string;

  @Expose()
  updatedAt?: string;
}
