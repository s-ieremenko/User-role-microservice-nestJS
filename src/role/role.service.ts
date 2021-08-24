import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Permission } from '../permission/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  async getRolesWithPermissions(): Promise<Role[]> {
    const roles: Role[] = await this.roleRepository.find({
      relations: ['permissions'],
    });
    if (!roles.length) {
      throw new Error('No roles were found');
    }
    return roles;
  }

  async createRoleWithPermissions(createRoleDto: CreateRoleDto): Promise<void> {
    const permissions: Permission[] = await this.permissionRepository.find({
      where: {
        uuid: In(createRoleDto.permissionUuids),
      },
    });
    if (!permissions.length) {
      throw new Error('Wrong permissionUuids');
    }
    const role: Role = this.roleRepository.create({
      name: createRoleDto.name,
      permissions,
    });
    await this.roleRepository.save(role);
  }

  async addPermissionToRole(updateRoleDto: UpdateRoleDto): Promise<void> {
    const role: Role = await this.roleRepository.findOne({
      where: { uuid: updateRoleDto.roleUuid },
    });
    const permission: Permission = await this.permissionRepository.findOne({
      where: { uuid: updateRoleDto.permissionUuid },
    });
    if (!role || !permission) {
      throw new Error('Incorrect data');
    }
    if (role.permissions.includes(permission)) {
      throw new Error('Permission already exists');
    }
    role.permissions.push(permission);
    this.roleRepository.save(role);
  }
}
