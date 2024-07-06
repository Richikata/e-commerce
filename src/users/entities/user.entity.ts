import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'email',
  })
  email: string;

  @Column({
    name: 'is_verified',
    default: false,
  })
  isVerified: boolean;
}
