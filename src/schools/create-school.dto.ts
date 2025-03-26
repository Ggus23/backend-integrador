import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

}