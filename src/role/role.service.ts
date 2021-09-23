import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Permission } from '../permission/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
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
      throw new NotFoundException('No roles were found');
    }
    return roles;
  }

  async createRoleWithPermissions(createRoleDto: CreateRoleDto): Promise<void> {
    const permissions: Permission[] = await this.permissionRepository.find({
      where: {
        uuid: In(createRoleDto.permissionUuids),
      },
    });
    if (!permissions || !permissions.length) {
      throw new BadRequestException('Wrong permissionUuids');
    }
    const existingRole: Role = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (existingRole) {
      throw new BadRequestException('Role already exists');
    }
    const role: Role = this.roleRepository.create({
      ...createRoleDto,
      permissions,
    });
    await this.roleRepository.save(role);
  }

  async addPermissionToRole(
    roleUuid: string,
    permissionUuid: string,
  ): Promise<void> {
    const role: Role = await this.roleRepository.findOne({
      where: { uuid: roleUuid },
      relations: ['permissions'],
    });

    const permission: Permission = await this.permissionRepository.findOne({
      where: { uuid: permissionUuid },
    });
    if (!role || !permission) {
      throw new BadRequestException('Incorrect data');
    }
    const existingPermission = role.permissions.find(
      (perm) => perm.name === permission.name,
    );

    if (existingPermission) {
      throw new BadRequestException('Permission already exists');
    }
    role.permissions.push(permission);
    await this.roleRepository.save(role);
  }
}
