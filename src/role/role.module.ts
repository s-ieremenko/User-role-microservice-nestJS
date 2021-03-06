import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Permission } from '../permission/permission.entity';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Module({
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RoleController],
})
export class RoleModule {}
