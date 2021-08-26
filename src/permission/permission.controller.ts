import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import PERMISSIONS from '../common/enums';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  async getAll(): Promise<Permission[]> {
    return this.permissionService.getPermissions();
  }

  @Post('post')
  async create(@Body('name') name: PERMISSIONS): Promise<void> {
    await this.permissionService.createPermission(name);
  }

  @Delete('delete')
  async delete(@Body('uuid') permissionUuid: string): Promise<void> {
    await this.permissionService.deletePermission(permissionUuid);
  }
}
