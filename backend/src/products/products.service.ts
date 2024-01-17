import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  async getProductById(productId: number) {
    try {
      const response = await this.productsRepository.findOne({where: [{ id: productId }]});
      if (!response)
        throw new NotFoundException(`Product with ID ${productId} not found`);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getAllProducts() {
    try {
      return await this.productsRepository
        .createQueryBuilder()
        .select('*')
        .orderBy('id', 'ASC')
        .getRawMany();
    } catch (err) {
      throw err;
    }
  }

  async createNewProduct(productDto: CreateProductDto) {
    try {
      const result = await this.productsRepository.save(productDto);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(id: number) {
    try {
      const result = await this.productsRepository
        .createQueryBuilder()
        .softDelete()
        .where('id =:id', { id })
        .execute();
      return result.affected;
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(productId: number, updateProduct: UpdateProductDto) {
    try {
      const product = await this.getProductById(productId);
      Object.assign(product, updateProduct);

      // Save the updated product to the database
      await this.productsRepository.save(product);
      return product;
    } catch (err) {
      throw err;
    }
  }
}
