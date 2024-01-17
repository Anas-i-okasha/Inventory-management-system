import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as config from '../../../.././config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async checkUserExist(email: string) {
    try {
      return this.userRepository.findOne({ where: { email } });
    } catch (err) {
      throw new err();
    }
  }

  async insertNewUser(user: any) {
    try {
      user.password = await bcrypt.hash(user.password, config.env.salt);
      return (
        await this.userRepository
          .createQueryBuilder()
          .insert()
          .values(user)
          .returning('id, email')
          .execute()
      ).raw[0];
    } catch (err) {
      throw new err();
    }
  }

  async login(user: any) {
    try {
      const email = user.email.toLowerCase().trim();
      const userInfo = await this.checkUserExist(email);
      if (!userInfo) return { err: 'not_found', res: null };

      if (await bcrypt.compare(user.password, userInfo.password))
        return { err: 'check_email_or_password', res: null };
      return { err: null, res: userInfo };
    } catch (err) {
      throw err;
    }
  }
  //   create(createUserDto: CreateUserDto) {
  //     return 'This action adds a new user';
  //   }

  //   findAll() {
  //     return `This action returns all user`;
  //   }

  //   findOne(email: string) {
  //     return `This action returns a #${id} user`;
  //   }

  //   update(id: number, updateUserDto: UpdateUserDto) {
  //     return `This action updates a #${id} user`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} user`;
  //   }
}
