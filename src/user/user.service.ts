import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { Role } from '../role/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async getUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find({
      relations: ['role'],
    });
    if (!users.length) {
      throw new NotFoundException('No users were found');
    }
    return users;
  }

  async getOneUser(userUuid: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: {
        uuid: userUuid,
      },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async isAdmin(user: User): Promise<string> {
    if (user.role.name !== 'Admin') {
      throw new ForbiddenException('Not admin');
    }
    return user.role.name;
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const userExist: User = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (userExist) {
      throw new BadRequestException('User already exists');
    }
    const user: User = this.userRepository.create(createUserDto);
    this.userRepository.save(user);
  }

  async addRoleToUser(
    userUuid: string,
    roleUuid: string,
  ): Promise<UpdateResult> {
    if (!userUuid) {
      throw new BadRequestException('UserUuid is required');
    }
    return await this.userRepository.update(userUuid, {
      roleUuid,
    });
  }
}
