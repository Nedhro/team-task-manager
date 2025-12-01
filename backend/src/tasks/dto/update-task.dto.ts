import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  title?: string;

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