import { Body, Get, Patch, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getAll() {
    return this.roleService.getRolesWithPermissions();
  }

  @Post('post')
  async create(@Body() createRoleDto: CreateRoleDto): Promise<void> {
    return this.roleService.createRoleWithPermissions(createRoleDto);
  }

  @Patch('patch')
  async update(
    @Query('roleUuid') roleUuid: string,
    @Body('permissionUuid') permissionUuid: string,
  ): Promise<void> {
    return await this.roleService.addPermissionToRole(roleUuid, permissionUuid);
  }
}
