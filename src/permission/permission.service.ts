import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import PERMISSIONS from '../common/enums';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  async getPermissions(): Promise<Permission[]> {
    const permissionWithUuids = await this.permissionRepository.find({
      select: ['uuid', 'name'],
    });
    if (!permissionWithUuids.length) {
      throw new Error('No permissions were found');
    }
    return permissionWithUuids;
  }

  async createPermission(name: PERMISSIONS): Promise<void> {
    const permissionExist: Permission = await this.permissionRepository.findOne(
      {
        where: {
          name,
        },
      },
    );
    if (permissionExist) {
      throw new Error('Permission already exists');
    }
    const permission = this.permissionRepository.create({
      name,
    });
    await this.permissionRepository.save(permission);
  }
  async deletePermission(permissionUuid: string): Promise<void> {
    const permission = await this.permissionRepository.findOne(permissionUuid);
    if (!permission) {
      throw new Error('Wrong permission uuid');
    }
    await this.permissionRepository.remove(permission);
  }
}
