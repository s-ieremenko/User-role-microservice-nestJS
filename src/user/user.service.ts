import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../role/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/upate-user.dto';
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
      throw new Error('No users were found');
    }
    return users;
  }

  async getUser(userUuid: string): Promise<User> {
    const user: User = await this.userRepository.findOne(userUuid, {
      relations: ['role'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async isAdmin(user: User): Promise<boolean> {
    if (user.role.name !== 'Admin') {
      return false;
    }
    return true;
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const userExist: User = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (userExist) {
      throw new Error('User already exists');
    }
    const user: User = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
    });
    this.userRepository.save(user);
  }
  async addRoleForUser(updateUserDto: UpdateUserDto): Promise<void> {
    const user: User = await this.userRepository.findOne(
      updateUserDto.userUuid,
    );
    const role: Role = await this.roleRepository.findOne(
      updateUserDto.roleUuid,
    );
    if (!user || !role) {
      throw new Error('User or role not found');
    }
    user.role = role;
    this.userRepository.save(user);
  }
}
