import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from '../providers/todo.service';
import {
  TodoCreateDto,
  TodoUpdateDto,
  TodoFindDto,
  TodoResponseDto,
} from '../dto';
import { ResponseEntity } from 'src/common/types';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto';
import { instanceToPlain } from 'class-transformer';
import { TodoSortDto } from '../dto/todo.sort.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() body: TodoCreateDto,
  ): Promise<ResponseEntity<TodoResponseDto>> {
    const createdTodo = await this.todoService.create(body);
    return {
      success: true,
      data: createdTodo,
    };
  }

  @Get()
  async findAll(
    @Query() query: TodoFindDto,
    @Query() pagination: PaginationDto,
    @Query() sort: TodoSortDto,
  ): Promise<ResponseEntity<TodoResponseDto[]>> {
    const foundTodos = await this.todoService.findAll(
      instanceToPlain(query, { exposeUnsetFields: false }),
      pagination,
      sort,
    );
    return {
      success: true,
      data: foundTodos,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ResponseEntity<TodoResponseDto>> {
    const foundTodo = await this.todoService.findOne(id);
    return {
      success: true,
      data: foundTodo,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: TodoUpdateDto,
  ): Promise<ResponseEntity<TodoResponseDto>> {
    const updatedTodo = await this.todoService.update(id, body);
    return {
      success: true,
      data: updatedTodo,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ResponseEntity<TodoResponseDto>> {
    const deletedTodo = await this.todoService.remove(id);
    return {
      success: true,
      data: deletedTodo,
    };
  }
}
