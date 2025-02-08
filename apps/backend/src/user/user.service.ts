import { Injectable } from '@nestjs/common';
import CreateUserEntity from './entities/create-user.entity';
import UpdateUserEntity from './entities/update-user.entity';

@Injectable()
export class UserService {
  create(createUserEntity: CreateUserEntity) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserEntity: UpdateUserEntity) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
