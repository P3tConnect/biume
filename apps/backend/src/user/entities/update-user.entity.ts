import { PartialType } from '@nestjs/mapped-types';
import CreateUserEntity from './create-user.entity';

export default class UpdateUserEntity extends PartialType(CreateUserEntity) {}
