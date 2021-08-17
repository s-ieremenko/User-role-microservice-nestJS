import { Body, Patch, Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Res, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/upate-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async read(@Res() res: Response) {
    try {
      const users: User[] = await this.userService.getUsers();
      res.status(HttpStatus.OK).send(users);
    } catch (error: any) {
      res.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Get('admin')
  async readUser(
    @Query('uuid') uuid: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!uuid) {
      return res.status(HttpStatus.BAD_REQUEST).send('User uuid required');
    }
    try {
      const user: User = await this.userService.getUser(uuid);
      const admin: boolean = await this.userService.isAdmin(user);
      if (!admin) {
        return res.status(HttpStatus.FORBIDDEN).send('Not admin');
      }
      return res.status(HttpStatus.OK).send('Admin');
    } catch (error: any) {
      res.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Post('post')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (!createUserDto.name || !createUserDto.email) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Fields "name" or "email" required');
    }
    try {
      await this.userService.createUser(createUserDto);
      res.status(HttpStatus.CREATED).send('User is created');
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
  @Patch('patch')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (!updateUserDto.userUuid || !updateUserDto.roleUuid) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Fields "userUuid" or "roleUuid" required');
    }
    try {
      await this.userService.addRoleForUser(updateUserDto);
      res.status(HttpStatus.CREATED).send('Role is created');
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
