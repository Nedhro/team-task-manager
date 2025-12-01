import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const payload: any = { title: dto.title, description: dto.description, status: dto.status };
    if (dto.assignee) payload.assignee = new Types.ObjectId(dto.assignee);
    if (dto.dueDate) payload.dueDate = new Date(dto.dueDate);
    const created = new this.taskModel(payload);
    return created.save();
  }

  async findAll(): Promise<any[]> {
    return this.taskModel.find().lean();
  }

  async findOne(id: string): Promise<any> {
    const task = await this.taskModel.findById(id).lean();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<any> {
    const update: any = { ...dto };
    if (dto.assignee) update.assignee = new Types.ObjectId(dto.assignee);
    if (dto.dueDate) update.dueDate = new Date(dto.dueDate);
    const task = await this.taskModel.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async remove(id: string): Promise<void> {
    const res = await this.taskModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Task not found');
  }
}