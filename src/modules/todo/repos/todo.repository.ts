import { IRepository, Pagination } from 'src/common/types';
import { Todo } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { EntityNotFound } from 'src/common/errors/EntityNotFound.error';

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
    const foundTodos = await this.todoModel
      .find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .lean()
      .exec();
    console.log(query);
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
