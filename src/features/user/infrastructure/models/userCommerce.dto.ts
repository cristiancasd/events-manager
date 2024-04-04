import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { CommerceTypeORMEntity } from '../../../commerce';
//import { CommerceUserRoles } from '../../../../core';
import { LevelTypeORMEntity } from '../../../levels';
import { CommerceUserRoles } from '../../../../core/shared/constants';
import { UserTypeORMEntity } from './users.dto';
import { v4 as uuidv4 } from 'uuid';

@Entity('userCommerce')
export class UserCommerceTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  email!: string;

  @Column({ length: 200, select: false })
  password!: string;

  @Column({ length: 50 })
  commerceUserId!: string;

  @Column()
  role!: CommerceUserRoles;

  @Column()
  isActive!: boolean;

  @Column({ default: '' })
  freeSpace?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(() => CommerceTypeORMEntity, (commerce) => commerce.levels, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  commerce!: CommerceTypeORMEntity;

  @ManyToOne(() => LevelTypeORMEntity, (level) => level.usersCommerce, {
    eager: true
  })
  level!: LevelTypeORMEntity;

  @ManyToOne(() => UserTypeORMEntity, (user) => user.usersCommerce, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user!: UserTypeORMEntity;
  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }
}
