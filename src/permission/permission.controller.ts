import { Body, HttpStatus, Res } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Response } from 'express';

import PERMISSIONS from 'src/common/enums';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  async read(@Res() res: Response): Promise<void> {
    try {
      const permissionWithUuids: Permission[] =
        await this.permissionService.getPermissions();
      res.status(HttpStatus.OK).send(permissionWithUuids);
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  @Post('post')
  async create(
    @Res() res: Response,
    @Body('name') name: PERMISSIONS,
  ): Promise<Response> {
    if (!name) {
      return res.status(HttpStatus.BAD_REQUEST).send('Field "name" required');
    }
    try {
      await this.permissionService.createPermission(name);
      res.status(HttpStatus.CREATED).send('Permission is created');
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  @Delete('delete')
  async delete(
    @Res() res: Response,
    @Body('permissionUuid') permissionUuid: string,
  ): Promise<Response> {
    if (!permissionUuid) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Field "permissionUuid" required');
    }
    try {
      await this.permissionService.deletePermission(permissionUuid);
      res.status(HttpStatus.OK).send('Permission deleted');
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
