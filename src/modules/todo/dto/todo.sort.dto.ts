import { IsOptional } from 'class-validator';
import { SortOrder } from 'mongoose';

export class TodoSortDto {
  @IsOptional()
  sortBy?: 'title' | 'dateTime' | '_id' = '_id';

  @IsOptional()
  sortOrder?: SortOrder = 'desc';
}
