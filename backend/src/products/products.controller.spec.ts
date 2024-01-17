import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TestData } from 'src/factories/common';
import productsFactory from 'src/factories/products.factory';
describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  describe('getAllProdects', () => {
    it('should return all products successfully', async () => {
      const products = TestData.getData(productsFactory, )
		jest.spyOn(ProductsService.prototype, 'getAllProducts').mockResolvedValue();
	});
  });

  
});
