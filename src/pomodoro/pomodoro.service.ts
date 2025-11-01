import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) { }

	async getAll(userId: string) {
		return this.prisma.task.findMany({
			where: {
				userId
			}
		})
	}

	async create(dto: TaskDto, userId: string) {
		return this.prisma.task.create({
			data: {
				...dto,
				user: {
					connect:{
						id: userId
					}
				}
			}
		})
	}

	async update(dto: Partial<TaskDto>, userId: string, taskId: string) {
		return this.prisma.task.update({
			where:{
				userId,
				id: taskId
			},
			data: dto
		})
	}

	async delete(id: string) {
		return this.prisma.task.delete({
			where:{
				id: id
			}
		})
	}
}
