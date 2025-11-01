import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { hash } from 'argon2'
import { startOfDay, subDays } from 'date-fns';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) { }

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				tasks: true
			}
		})
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		if(!profile) {
			throw new NotFoundException('User with this email not exists')
		}

		const totalTasks = profile.tasks.length
		const completedTasks = await this.prisma.task.count({
			where: {
				userId: id,
				isCompleted: true
			}
		})

		const todayStart = startOfDay(new Date())
		const weekStart = startOfDay(subDays(new Date(), 7))

		const todayTasks = await this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte : todayStart.toISOString()
				}
			}
		})


		const weekTasks = await this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte : weekStart.toISOString()
				}
			}
		})

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {password, ...rest} = profile

		return {
			user: rest,
			statistics: [
				{label: 'Total', value: totalTasks},
				{label: 'Completes Tasks', value: completedTasks},
				{label: 'Today tasks', value: todayTasks},
				{label: 'Week tasks', value: weekTasks}
			]
		}


	}

	async create(data: AuthDto) {
		const user = {
			email: data.email,
			name: '',
			password: await hash(data.password)
		}

		return this.prisma.user.create({
			data: user
		})
	}

	async update(id: string, dto: UserDto) {
		let data =dto

		if(dto.password){
			data = {...data, password: await hash(dto.password)}
		}

		return this.prisma.user.update({
			where: {
				id: id
			},
			data,
			select:{
				name : true,
				email : true,
			}
		})

	}
}
