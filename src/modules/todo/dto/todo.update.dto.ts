import { PartialType } from '@nestjs/mapped-types';
import { TodoCreateDto } from './todo.create.dto';

export class TodoUpdateDto extends PartialType(TodoCreateDto) {}
