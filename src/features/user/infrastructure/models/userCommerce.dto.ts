import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import { CommerceTypeORMEntity } from '../../../commerce';
import { LevelTypeORMEntity } from '../../../levels';
import { CommerceUserRoles } from '../../../../core/shared/constants';
import { UserTypeORMEntity } from './users.dto';
import { v4 as uuidv4 } from 'uuid';
import { ProspectTypeORMEntity } from '../../../prospects';

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

  @ManyToOne(
    () => CommerceTypeORMEntity,
    (commerce) => commerce.usersCommerce,
    {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
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

  @OneToMany(() => ProspectTypeORMEntity, (prospect) => prospect.userCommerce, {
    cascade: true
  })
  prospects!: ProspectTypeORMEntity[];

  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }
}
