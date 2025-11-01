import { IsOptional, IsString, IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';



export class TimeBlockDto {

    constructor(name: string, duration: number, order: number) {
        this.name = name;
        this.duration = duration;
        this.order = order;
    }


    @IsString()
    name: string


    @IsOptional()
    @IsString()
    color?: string

    @IsNumber()
    duration: number

    @IsOptional()
    @IsNumber()
    order: number
}