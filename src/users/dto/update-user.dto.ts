import {
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class UpdateUserDto {
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
    contrasena_hasheada?: string;
  
    @IsString()
    @IsOptional()
    rol?: string;
  }