import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  UseGuards,
  Patch,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@UseGuards(AuthGuard) // for all APIs inside the controller
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('get-all-products')
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Post('add-new-product')
  async addNewProduct(@Body(ValidationPipe) productDto: CreateProductDto) {
    await this.productsService.createNewProduct(productDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body(ValidationPipe) updateProduct: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(productId, updateProduct);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: number) {
    return await this.productsService.deleteProduct(productId);
  }
}
