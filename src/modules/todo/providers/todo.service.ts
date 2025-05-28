import { Injectable } from '@nestjs/common';
import { Todo } from '../entities';
import { TodoRepository } from '../repos/todo.repository';
import {
  TodoCreateDto,
  TodoFindDto,
  TodoResponseDto,
  TodoUpdateDto,
} from '../dto';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/common/dto';
import { TodoSortDto } from '../dto/todo.sort.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepo: TodoRepository) {}

  async create(todoCreateDto: TodoCreateDto): Promise<TodoResponseDto> {
    const todo = plainToInstance(Todo, todoCreateDto);
    const createdTodo = await this.todoRepo.create(todo);
    const data = plainToInstance(TodoResponseDto, createdTodo, {
      excludeExtraneousValues: true,
    });
    return data;
  }

  async findAll(
    todoFindDto: TodoFindDto,
    pagination: PaginationDto,
    todoSortDto: TodoSortDto,
  ): Promise<TodoResponseDto[]> {
    const foundTodos = await this.todoRepo.find(
      {
        ...todoFindDto,
        ...(typeof todoFindDto?.dateTime == 'string' && {
          dateTime: new Date(todoFindDto.dateTime),
        }),
      },
      pagination,
      todoSortDto.sortBy,
      todoSortDto.sortOrder,
    );
    const data = plainToInstance(TodoResponseDto, foundTodos, {
      excludeExtraneousValues: true,
    });
    return data;
  }

  async findOne(id: string): Promise<TodoResponseDto> {
    const foundTodo = await this.todoRepo.findOne(id);
    const data = plainToInstance(TodoResponseDto, foundTodo, {
      excludeExtraneousValues: true,
    });
    return data;
  }

  async update(
    id: string,
    todoUpdateDto: TodoUpdateDto,
  ): Promise<TodoResponseDto> {
    const todo = plainToInstance(Todo, todoUpdateDto);
    const updatedTodo = await this.todoRepo.update(id, todo);
    const data = plainToInstance(TodoResponseDto, updatedTodo, {
      excludeExtraneousValues: true,
    });
    return data;
  }

  async remove(id: string): Promise<TodoResponseDto> {
    const deletedTodo = await this.todoRepo.delete(id);
    const data = plainToInstance(TodoResponseDto, deletedTodo, {
      excludeExtraneousValues: true,
    });
    return data;
  }
}
