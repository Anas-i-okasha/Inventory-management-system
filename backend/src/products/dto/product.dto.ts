import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock_quantity: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Name should be a string' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price should be a number' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Stock quantity should be a number' })
  stock_quantity?: number;
}
