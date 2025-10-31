import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'

@Injectable()
export class AuthService {
    constructor(
         private jwtService: JwtService,
         private userService: UserService
    ) {}

    async login(dto: AuthDto) {

        const {password, ...user} = await this.validateUser(dto)
        const tokens = this.issueToken(user.id)

        return {
            ...tokens,
            user
        }  
    }

    async register(dto: AuthDto) {

        const oldUser = await this.userService.getByEmail(dto.email)
        if (oldUser) {
            throw new NotFoundException('User with this email already exists')
        }

        const {password, ...user} = await this.userService.create(dto)
        const tokens = this.issueToken(user.id)

        return {
            ...tokens,
            user
        }  
    }

    private issueToken(userId: string) {
        const data = { id: userId }
        const accessToken = this.jwtService.sign(data, {
            expiresIn: '1h'
        })

        const refreshToken = this.jwtService.sign(data, {
            expiresIn: '7d'
        })

        return {
            accessToken,
            refreshToken
        }
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.userService.getByEmail(dto.email)

        if (!user) {throw new NotFoundException('User not found')}

        const isValid = await verify(user.password, dto.password)

        

        return user
    }
}
