import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMensajeDto {
  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;

  @IsNumber()
  @IsNotEmpty()
  id_proyecto: number;

  @IsString()
  @IsNotEmpty()
  mensaje: string;
}