import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';



export class TaskDto {

    constructor(name: string) {
        this.name = name;
    }

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean

    @IsString()
    @IsOptional()
    createdAt?: string
    
    @IsEnum(Priority)
    @IsOptional()
    @Transform(({value}) => ('' + value).toLowerCase())
    priority?: Priority
}