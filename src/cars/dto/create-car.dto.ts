import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  marca: string;

  @IsNotEmpty()
  @IsString()
  modelo: string;

  @IsNotEmpty()
  @IsNumber()
  ano: number;

  @IsNotEmpty()
  @IsString()
  renavam: string;

  @IsNotEmpty()
  @IsString()
  chassi: string;

  @IsNotEmpty()
  @IsString()
  placa: string;
}
