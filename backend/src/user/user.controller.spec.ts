import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TestData } from 'src/factories/common';
import { UsersEntityFactory } from 'src/factories/users.factory';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('registerAPI', () => {
    it('should return user already exist error', async () => {
      const user = await TestData.getData(
        UsersEntityFactory,
        'userEntityFactory',
      );
      jest
        .spyOn(UserService.prototype, 'checkUserExist')
        .mockResolvedValue(user);

      const result = await controller.register(user);
      expect(result).toBe('user_already_exist');
    });

    it('should return success message', async () => {
      const user = await TestData.getData(
        UsersEntityFactory,
        'userEntityFactory',
      );
      jest.spyOn(UserService.prototype, 'checkUserExist').mockResolvedValue([]);

      const result = await controller.register(user);
      expect(result.email).toBe(user.email);
    });
  });

  describe('LoginAPI', () => {
    it('should return login_failed error message', async () => {
      const user = await TestData.getData(
        UsersEntityFactory,
        'userEntityFactory',
      );

      jest.spyOn(UserService.prototype, 'checkUserExist').mockResolvedValue(user);
      const result = await controller.login(user, null, null);
      expect(result).toBe('login_failed')
    });
  });
});
