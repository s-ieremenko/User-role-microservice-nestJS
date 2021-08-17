import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permission/permission.entity';
import { Role } from 'src/role/role.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'users1',
      entities: [Role, User, Permission],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
