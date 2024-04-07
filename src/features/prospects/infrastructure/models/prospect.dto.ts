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
import { ProspectType } from '../../../../core/shared/constants';
import { v4 as uuidv4 } from 'uuid';
import { UserCommerceTypeORMEntity } from '../../../user/infrastructure/models/userCommerce.dto';

@Entity('prospect')
export class ProspectTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 50 })
  phone!: string;

  @Column()
  type!: ProspectType;

  @Column()
  commerceUid!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(
    () => UserCommerceTypeORMEntity,
    (userCommerce) => userCommerce.prospects,
    {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  userCommerce!: UserCommerceTypeORMEntity;

  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }

  @BeforeUpdate()
  async updateData() {
    this.name = this.name.toLowerCase();
  }
}
