import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseStatus {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
