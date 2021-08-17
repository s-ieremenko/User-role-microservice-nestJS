import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { Permission } from './permission/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, UserModule, RoleModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
