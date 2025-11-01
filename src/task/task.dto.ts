import { IsNumber, IsOptional, Min, IsEmail, MinLength, IsString, IsAlpha } from 'class-validator';

export class PromodoraSettingsDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    workInterval?: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    breakInterval?: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    intervalsCount?: number
}

export class UserDto extends PromodoraSettingsDto {

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @MinLength(6, {
         message: 'Password must be at least 6 characters long' 
        })
    @IsString()
    password?: string
}