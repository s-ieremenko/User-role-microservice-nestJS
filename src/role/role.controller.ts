import { Body, Get, HttpStatus, Patch, Post, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { response, Response } from 'express';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async read(@Res() res: Response) {
    try {
      const roles: Role[] = await this.roleService.getRolesWithPermissions();
      res.status(HttpStatus.OK).send(roles);
    } catch (error: any) {
      res.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Post('post')
  async create(
    @Res() res: Response,
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<Response> {
    if (!createRoleDto.name || !createRoleDto.permissionUuids) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('Fields "name" and "permissionUuids required"');
    }
    try {
      await this.roleService.createRoleWithPermissions(createRoleDto);
      res.status(HttpStatus.CREATED).send('Role is created');
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  @Patch('patch')
  async update(
    @Res() res: Response,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Response> {
    if (!updateRoleDto.roleUuid || !updateRoleDto.permissionUuid) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Fields "roleUuid" and "permissionUuid" required');
    }
    try {
      await this.roleService.addPermissionToRole(updateRoleDto);
      res.status(HttpStatus.OK).send('Permission added');
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
