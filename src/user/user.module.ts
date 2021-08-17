import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
  controllers: [UserController],
})
export class UserModule {}
