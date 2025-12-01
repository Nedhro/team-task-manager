import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(['todo', 'in_progress', 'done'] as any)
  status?: 'todo' | 'in_progress' | 'done';

  @IsOptional()
  assignee?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}