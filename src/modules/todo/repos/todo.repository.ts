import { IRepository, Pagination } from 'src/common/types';
import { Todo } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { EntityNotFound } from 'src/common/errors/EntityNotFound.error';
import { Status } from '../types/status.enum';

@Injectable()
export class TodoRepository implements IRepository<Todo> {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async create(todo: Todo): Promise<Todo> {
    const createdTodo = await this.todoModel.create(todo);
    return createdTodo.save();
  }

  async findOne(id: string): Promise<Todo> {
    const foundTodo = await this.todoModel.findById(id).exec();
    if (!foundTodo) throw new EntityNotFound<Todo>(Todo);
    return foundTodo;
  }

  async find(
    query: FilterQuery<Todo>,
    pagination: Pagination,
    sortBy: string = '_id',
    sortOrder: SortOrder = 'desc',
  ): Promise<Todo[]> {
    const filter: FilterQuery<Todo> = {};

    // Include match for title
    if (query.title) {
      filter.title = { $regex: query.title as string, $options: 'i' }; // case-insensitive include match
    }

    // Include match for content
    if (query.content) {
      filter.content = { $regex: query.content as string, $options: 'i' };
    }

    // Copy over other exact-match fields
    if (query.status) {
      filter.status = query.status as Status;
    }

    if (query.dateTime) {
      filter.dateTime = query.dateTime as string;
    }

    const foundTodos = await this.todoModel
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .lean()
      .exec();
    return foundTodos;
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todo, {
      returnDocument: 'after',
    });
    if (!updatedTodo) throw new EntityNotFound<Todo>(Todo);
    return updatedTodo;
  }

  async delete(id: string): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id);
    if (!deletedTodo) throw new EntityNotFound<Todo>(Todo);
    return deletedTodo;
  }
}
