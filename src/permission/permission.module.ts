import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionController } from './permission.controller';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';

@Module({
  providers: [PermissionService],
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
})
export class PermissionModule {}
