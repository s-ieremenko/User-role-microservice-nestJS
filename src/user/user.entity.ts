import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from 'src/role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
