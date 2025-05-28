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
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Status } from '../types/status.enum';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBody({
    description: 'Create a new TODO item',
    type: TodoCreateDto,
    examples: {
      example1: {
        summary: 'Basic example',
        value: {
          title: 'Finish project report',
          content: 'Complete the final draft and send it to the manager',
          status: 'in_progress',
          dateTime: '2025-06-05T15:30:00.000Z',
        },
      },
      example2: {
        summary: 'Minimal example',
        value: {
          title: 'Schedule dentist appointment',
        },
      },
    },
  })
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

  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter by title',
    example: 'Buy groceries',
  })
  @ApiQuery({
    name: 'content',
    required: false,
    description: 'Filter by content',
    example: 'milk, bread',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by status',
    enum: Status,
    example: 'todo',
  })
  @ApiQuery({
    name: 'dateTime',
    required: false,
    description: 'Filter by dateTime',
    example: '2025-06-01T10:00:00Z',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Pagination skip',
    example: 0,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Pagination limit',
    example: 10,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort by field',
    enum: ['title', 'dateTime', '_id'],
    example: '_id',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sort order',
    enum: ['asc', 'desc'],
    example: 'desc',
  })
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

  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the TODO item',
    type: 'string',
    example: '68374b0d3f8d87e0c8efed08',
  })
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

  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the TODO item',
    type: 'string',
    example: '68374b0d3f8d87e0c8efed08',
  })
  @ApiBody({
    description: 'Update a TODO item',
    type: TodoUpdateDto,
    examples: {
      example1: {
        summary: 'Basic example',
        value: {
          title: 'Finish project report',
          content: 'Complete the final draft and send it to the manager',
          status: 'in_progress',
          dateTime: '2025-06-05T15:30:00.000Z',
        },
      },
      example2: {
        summary: 'Minimal example',
        value: {
          title: 'Schedule dentist appointment',
        },
      },
    },
  })
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

  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the TODO item',
    type: 'string',
    example: '68374b0d3f8d87e0c8efed09',
  })
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
