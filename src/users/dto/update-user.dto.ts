import {
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class UpdateUserDto {
    @IsOptional()
    id_usuario?: number;

    @IsString()
    @MinLength(4)
    @IsOptional()
    nombre?: string;
  
    @IsInt()
    @IsPositive()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    contrasena?: string;
  
    @IsString()
    @IsOptional()
    rol?: string;
  }