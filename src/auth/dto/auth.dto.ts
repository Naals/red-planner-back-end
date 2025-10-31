import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
    
    @IsEmail()
    email: string
    
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @IsString()
    password: string
}