import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  databaseName,
  dialect,
  hostDB,
  passwordDB,
  portDB,
  typeDB,
} from '../common/constants';
import { Permission } from '../permission/permission.entity';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: typeDB,
      host: hostDB,
      port: portDB,
      username: dialect,
      password: passwordDB,
      database: databaseName,
      entities: [Role, User, Permission],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
