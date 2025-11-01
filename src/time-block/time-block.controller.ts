import {
	Body,
	Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { TaskDto } from './task.dto';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { UserDto } from '../user/user.dto';

@Controller('user/tasks')
export class TaskController {

	constructor(private readonly taskService: TaskService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string, @Body() dto: TaskDto) {
		return this.taskService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(":id")
	@Auth()
	async update(@CurrentUser('id') userId: string, @Body() dto: TaskDto, @Param('id') taskId: string) {
		return this.taskService.update(dto, userId, taskId)
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.taskService.delete(id)
	}

}
