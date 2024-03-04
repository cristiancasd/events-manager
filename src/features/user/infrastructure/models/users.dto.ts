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

@Entity('user')
export class UserTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column()
  phone!: number;

  @Column({ length: 50 })
  email!: string;

  @Column({ length: 50, select: false })
  password!: string;

  @Column()
  document!: number;

  @Column({ length: 50 })
  commerceUserId!: string;

  @Column()
  role!: CommerceUserRoles;

  @Column()
  isActive!: boolean;

  @Column()
  freeSpace?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  convertToUppercase() {
    this.email = this.email.toLocaleLowerCase();
    this.name = this.name.toLocaleLowerCase();
  }

  @ManyToOne(() => CommerceTypeORMEntity, (commerce) => commerce.levels, {
    eager: true, //cargar automaticamente la relación, que en el fron muestre el
    onDelete: 'CASCADE'
  })
  commerce!: CommerceTypeORMEntity;

  @ManyToOne(() => LevelTypeORMEntity, (level) => level.users, {
    eager: true //cargar automaticamente la relación, que en el fron muestre el
  })
  level!: LevelTypeORMEntity;
}
