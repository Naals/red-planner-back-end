import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { hash } from 'argon2'
import { th } from 'date-fns/locale'

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
}
