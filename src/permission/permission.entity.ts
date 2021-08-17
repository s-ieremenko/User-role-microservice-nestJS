import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from 'src/role/role.entity';
import PERMISSIONS from '../common/enums';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({ type: 'enum', enum: PERMISSIONS })
  name!: PERMISSIONS;

  @ManyToMany(() => Role, (role) => role.permissions, { cascade: true })
  roles: Role[];
}
