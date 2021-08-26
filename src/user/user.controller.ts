import { Body, Patch, Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('admin')
  async getUser(@Query('uuid') uuid: string): Promise<string> {
    const user: User = await this.userService.getOneUser(uuid);
    console.log(user);
    return this.userService.isAdmin(user);
  }

  @Post('post')
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }

  @Patch('patch')
  async update(
    @Query('userUuid') userUuid: string,
    @Body('roleUuid') roleUuid: string,
  ): Promise<UpdateResult> {
    return await this.userService.addRoleToUser(userUuid, roleUuid);
  }
}
