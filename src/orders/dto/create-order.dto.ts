import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  details: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  user_id: string;
}
