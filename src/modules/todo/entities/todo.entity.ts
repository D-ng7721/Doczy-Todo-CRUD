import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '../types/status.enum';

@Schema({ timestamps: true })
export class Todo {
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: String })
  content: string;

  @Prop({ enum: Status, default: Status.Todo, index: true })
  status: Status;

  @Prop({ type: Date, index: true })
  dateTime: Date;

  // @Prop({ type: Date })
  // createdAt: Date;

  // @Prop({ type: Date })
  // updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
