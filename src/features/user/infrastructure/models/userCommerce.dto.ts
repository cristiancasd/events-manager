

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
    eager: true, //cargar automaticamente la relación, que en el fron muestre el
    onDelete: 'CASCADE'
  })
  commerce!: CommerceTypeORMEntity;

  @ManyToOne(() => LevelTypeORMEntity, (level) => level.usersCommerce, {
    eager: true,
    onDelete: 'CASCADE'
  })
  level!: LevelTypeORMEntity;

  @ManyToOne(() => UserTypeORMEntity, (user) => user.usersCommerce, {
    eager: true,
    onDelete: 'CASCADE'
  })
  user!: UserTypeORMEntity;
}
